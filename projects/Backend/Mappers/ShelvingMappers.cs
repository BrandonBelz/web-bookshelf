using Backend.Dtos.Shelvings;
using Backend.Models;

namespace Backend.Mappers;

public static class ShelvingMappers
{
    public static ShelvingMinimized ToShelvingMinimized(this Shelving shelving)
    {
        return new ShelvingMinimized
        {
            Id = shelving.Id,
            Bookshelf = shelving.Bookshelf.ToBookshelfMinimized(),
            Book = shelving.Book.ToBookMinimized(),
        };
    }
}
