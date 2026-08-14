using Backend.Dtos.Authors;
using Backend.Mappers;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("/api/authors")]
public class AuthorController : ControllerBase
{
    private readonly AuthorRepository _authorRepo;

    public AuthorController(AuthorRepository authorRepo)
    {
        _authorRepo = authorRepo;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<AuthorMinimized>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        return Ok(
            (await _authorRepo.GetAuthorsAsync()).Select(a => AuthorMappers.ToAuthorMinimized(a))
        );
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(AuthorPublic), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get([FromRoute] int id)
    {
        Author? author = await _authorRepo.GetAuthorAsync(id);

        if (author == null)
        {
            return NotFound();
        }

        return Ok(AuthorMappers.ToAuthorPublic(author));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        Author? author = await _authorRepo.DeleteAuthorAsync(id);

        if (author == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPost]
    [ProducesResponseType(typeof(AuthorPublic), StatusCodes.Status201Created)]
    public async Task<IActionResult> Create([FromBody] AuthorCreateDto dto)
    {
        Author newAuthor = await _authorRepo.CreateAuthorAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = newAuthor.Id }, newAuthor.ToAuthorPublic());
    }

    [HttpPut("{id}/name")]
    [ProducesResponseType(typeof(AuthorPublic), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateName(
        [FromRoute] int id,
        [FromBody] AuthorUpdateNameDto dto
    )
    {
        Author? updatedAuthor = await _authorRepo.UpdateAuthorNameAsync(id, dto.Name);

        if (updatedAuthor == null)
        {
            return NotFound();
        }

        return Ok(updatedAuthor.ToAuthorPublic());
    }
}
