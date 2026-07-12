using Backend.Dtos.Authors;
using Backend.Models;

namespace Backend.Mappers;

public static class AuthorMappers
{
    public static AuthorMinimized ToAuthorMinimized(this Author author)
    {
        return new AuthorMinimized { Id = author.Id, Name = author.Name };
    }
}
