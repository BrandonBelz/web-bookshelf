using Backend.Dtos.Bookshelves;
using Backend.Models;

namespace Backend.Mappers;

public static class BookshelfMappers
{
    public static BookshelfMinimized ToBookshelfMinimized(this Bookshelf bookshelf)
    {
        return new BookshelfMinimized { Id = bookshelf.Id, Name = bookshelf.Name };
    }
}
