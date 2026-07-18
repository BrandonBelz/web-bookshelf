using Backend.Dtos.Books;
using Backend.Mappers;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("/api/books")]
public class BookController : ControllerBase
{
    private readonly BookRepository _bookRepo;

    public BookController(BookRepository bookRepo)
    {
        _bookRepo = bookRepo;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<BookMinimized>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        return Ok((await _bookRepo.GetBooksAsync()).Select(b => b.ToBookMinimized()));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(BookPublic), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get([FromRoute] int id)
    {
        Book? book = await _bookRepo.GetBookAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        return Ok(book.ToBookPublic());
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        Book? book = await _bookRepo.DeleteBookAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPost]
    [ProducesResponseType(typeof(BookPublic), StatusCodes.Status201Created)]
    public async Task<IActionResult> Create([FromBody] BookCreate dto)
    {
        Book newBook = await _bookRepo.CreateBookAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = newBook.Id }, newBook.ToBookPublic());
    }
}
