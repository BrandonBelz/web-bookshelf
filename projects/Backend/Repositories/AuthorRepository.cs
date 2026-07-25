using Backend.Data;
using Backend.Dtos.Authors;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class AuthorRepository
{
    private readonly AppDbContext _context;

    public AuthorRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Author>> GetAuthorsAsync()
    {
        return await _context.Authors.ToListAsync();
    }

    public async Task<Author?> GetAuthorAsync(int id)
    {
        return await _context.Authors.Include(a => a.Books).FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Author?> DeleteAuthorAsync(int id)
    {
        Author? author = await _context.Authors.FindAsync(id);
        if (author == null)
        {
            return null;
        }

        _context.Authors.Remove(author);
        await _context.SaveChangesAsync();
        return author;
    }

    public async Task<Author> CreateAuthorAsync(AuthorCreateDto dto)
    {
        Author author = new Author { Name = dto.Name };
        _context.Authors.Add(author);
        await _context.SaveChangesAsync();
        return author;
    }

    public async Task<Author?> UpdateAuthorNameAsync(int id, string name)
    {
        Author? author = await _context.Authors.FindAsync(id);
        if (author == null)
        {
            return null;
        }

        author.Name = name;
        author.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return author;
    }
}
