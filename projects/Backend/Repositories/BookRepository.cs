using Backend.Data;
using Backend.Dtos.Books;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class BookRepository
{
    private readonly AppDbContext _context;

    public BookRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Book>> GetBooksAsync()
    {
        return await _context.Books.Include(b => b.Authors).ToListAsync();
    }

    public async Task<Book?> GetBookAsync(int id)
    {
        return await _context
            .Books.Include(b => b.Authors)
            .Include(b => b.Volume)
            .Include(b => b.ReadLogs)
            .Include(b => b.Shelvings)
                .ThenInclude(s => s.Bookshelf)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<Book?> DeleteBookAsync(int id)
    {
        Book? book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return null;
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return book;
    }

    public async Task<Book> CreateBookAsync(BookCreate dto)
    {
        List<Author> authors = new List<Author>();
        if (dto.AuthorIds != null)
        {
            foreach (int authorId in dto.AuthorIds)
            {
                Author? author = await _context.Authors.FindAsync(authorId);
                if (author != null)
                {
                    authors.Add(author);
                }
            }
        }

        Book book = new Book
        {
            Title = dto.Title,
            Description = dto.Description,
            Rating = dto.Rating,
            Review = dto.Review,
            VolumeId = dto.VolumeId,
            Authors = authors,
        };

        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
        return book;
    }
}
