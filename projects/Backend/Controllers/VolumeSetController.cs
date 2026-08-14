using Backend.Dtos.VolumeSets;
using Backend.Mappers;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/volumesets")]
public class VolumeSetController : ControllerBase
{
    private readonly VolumeSetRepository _volumeSetRepository;

    public VolumeSetController(VolumeSetRepository volumeSetRepository)
    {
        _volumeSetRepository = volumeSetRepository;
    }

    [HttpPost]
    [ProducesResponseType(typeof(VolumeSetPublic), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateVolumeSet([FromBody] VolumeSetCreateDto dto)
    {
        VolumeSet volumeSet = await _volumeSetRepository.CreateVolumeSetAsync(dto);
        return CreatedAtAction(
            nameof(GetVolumeSetById),
            new { id = volumeSet.Id },
            volumeSet.ToVolumeSetPublic()
        );
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(VolumeSetPublic), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetVolumeSetById(int id)
    {
        VolumeSet? volumeSet = await _volumeSetRepository.GetVolumeSetByIdAsync(id);
        if (volumeSet == null)
        {
            return NotFound();
        }
        return Ok(volumeSet.ToVolumeSetPublic());
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<VolumeSetMinimized>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllVolumeSets()
    {
        List<VolumeSet> volumeSets = await _volumeSetRepository.GetAllVolumeSetsAsync();
        return Ok(volumeSets.Select(vs => vs.ToVolumeSetMinimized()).ToList());
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteVolumeSet(int id)
    {
        VolumeSet? deletedVolumeSet = await _volumeSetRepository.DeleteVolumeSetAsync(id);
        if (deletedVolumeSet == null)
        {
            return NotFound();
        }
        return NoContent();
    }
}
