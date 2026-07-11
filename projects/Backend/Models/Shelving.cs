namespace Backend.Models;

public class Shelving
{
    public int Id { get; set; }
    public int BookshelfId { get; set; }
    public Bookshelf Bookshelf { get; set; } = null!;
    public int BookId { get; set; }
    public Book Book { get; set; } = null!;
    public DateOnly ShelvedDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
