using Backend.Dtos.Books;
using Backend.Mappers;
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
}
