using Backend.Dtos.Authors;
using Backend.Models;

namespace Backend.Mappers;

public static class AuthorMappers
{
    public static AuthorMinimized ToAuthorMinimized(this Author author)
    {
        return new AuthorMinimized { Id = author.Id, Name = author.Name };
    }

    public static AuthorPublic ToAuthorPublic(this Author author)
    {
        return new AuthorPublic
        {
            Id = author.Id,
            Name = author.Name,
            CreatedAt = author.CreatedAt,
            UpdatedAt = author.UpdatedAt,
            Books = author.Books.Select(b => b.ToBookMinimized()).ToList(),
        };
    }
}
