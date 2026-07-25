using Backend.Dtos.Books;

namespace Backend.Dtos.Authors;

public class AuthorPublic
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<BookMinimized> Books { get; set; } = null!;
}
