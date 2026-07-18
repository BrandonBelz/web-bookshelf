using Backend.Dtos.Books;
using Backend.Models;

namespace Backend.Mappers;

public static class BookMappers
{
    public static BookMinimized ToBookMinimized(this Book book)
    {
        return new BookMinimized
        {
            Id = book.Id,
            Title = book.Title,
            Authors = book.Authors.Select(a => a.ToAuthorMinimized()).ToList(),
        };
    }

    public static BookPublic ToBookPublic(this Book book)
    {
        return new BookPublic
        {
            Id = book.Id,
            Title = book.Title,
            Description = book.Description,
            Rating = book.Rating,
            Review = book.Review,
            Authors = book.Authors.Select(a => a.ToAuthorMinimized()).ToList(),
            ReadLogs = book.ReadLogs.Select(rl => rl.ToReadLogMinimized()).ToList(),
            Shelvings = book.Shelvings.Select(s => s.ToShelvingMinimized()).ToList(),
            Volume = book.Volume?.ToVolumeMinimized(),
            CreatedAt = book.CreatedAt,
            UpdatedAt = book.UpdatedAt,
        };
    }
}
