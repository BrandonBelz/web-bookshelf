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
}
