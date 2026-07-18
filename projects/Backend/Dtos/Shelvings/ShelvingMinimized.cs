using Backend.Dtos.Books;
using Backend.Dtos.Bookshelves;

namespace Backend.Dtos.Shelvings;

public class ShelvingMinimized
{
    public int Id { get; set; }
    public BookshelfMinimized Bookshelf { get; set; } = null!;
    public BookMinimized Book { get; set; } = null!;
}
