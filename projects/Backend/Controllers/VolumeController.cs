using Backend.Dtos.Volumes;
using Backend.Mappers;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/volumes")]
public class VolumeController : ControllerBase
{
    private readonly VolumeRepository _volumeRepo;

    public VolumeController(VolumeRepository volumeRepo)
    {
        _volumeRepo = volumeRepo;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<VolumeMinimized>), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetVolumes()
    {
        List<Volume> volumes = await _volumeRepo.GetAllVolumesAsync();
        return Ok(volumes.Select(v => v.ToVolumeMinimized()).ToList());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(VolumePublic), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetVolume(int id)
    {
        Volume? volume = await _volumeRepo.GetVolumeByIdAsync(id);
        if (volume == null)
        {
            return NotFound();
        }
        return Ok(volume.ToVolumePublic());
    }

    [HttpPost]
    [ProducesResponseType(typeof(VolumePublic), StatusCodes.Status201Created)]
    public async Task<ActionResult> CreateVolume([FromBody] VolumeCreateDto volumeCreateDto)
    {
        var createdVolume = await _volumeRepo.CreateVolumeAsync(volumeCreateDto);
        return CreatedAtAction(
            nameof(GetVolume),
            new { id = createdVolume.Id },
            createdVolume.ToVolumePublic()
        );
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteVolume(int id)
    {
        Volume? deleted = await _volumeRepo.DeleteVolumeAsync(id);
        if (deleted == null)
        {
            return NotFound();
        }
        return NoContent();
    }
}
