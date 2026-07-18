using Backend.Dtos.Books;

namespace Backend.Dtos.ReadLogs;

public class ReadLogPublic
{
    public int Id { get; set; }
    public BookMinimized Book { get; set; } = null!;
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
