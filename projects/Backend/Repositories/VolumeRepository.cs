using Backend.Data;
using Backend.Dtos.Volumes;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class VolumeRepository
{
    private readonly AppDbContext _context;

    public VolumeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Volume> CreateVolumeAsync(VolumeCreateDto dto)
    {
        List<Book> books = new List<Book>();
        var queriableBooks = _context.Books.Include(b => b.Authors);
        if (dto.BookIds != null)
        {
            foreach (int bookId in dto.BookIds)
            {
                Book? book = await queriableBooks.FirstOrDefaultAsync(b => b.Id == bookId);
                if (book != null)
                {
                    books.Add(book);
                }
            }
        }

        Volume volume = new Volume
        {
            Title = dto.Title,
            ObtainedDate = dto.ObtainedDate,
            Pages = dto.Pages,
            Isbn = dto.Isbn,
            Publisher = dto.Publisher,
            PublishedDate = dto.PublishedDate,
            SetId = dto.SetId,
            Books = books,
        };

        await _context.Volumes.AddAsync(volume);
        await _context.SaveChangesAsync();
        return volume;
    }

    public async Task<Volume?> GetVolumeByIdAsync(int id)
    {
        return await _context
            .Volumes.Include(v => v.Books)
                .ThenInclude(b => b.Authors)
            .Include(v => v.Set)
            .FirstOrDefaultAsync(v => v.Id == id);
    }

    public async Task<List<Volume>> GetAllVolumesAsync()
    {
        return await _context
            .Volumes.Include(v => v.Books)
                .ThenInclude(b => b.Authors)
            .Include(v => v.Set)
            .ToListAsync();
    }

    public async Task<Volume?> DeleteVolumeAsync(int id)
    {
        Volume? volume = await _context
            .Volumes.Include(v => v.Books)
            .FirstOrDefaultAsync(v => v.Id == id);
        if (volume == null)
        {
            return null;
        }

        _context.Volumes.Remove(volume);
        _context.SaveChanges();
        return volume;
    }
}
