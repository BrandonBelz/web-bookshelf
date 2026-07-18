namespace Backend.Dtos.Books;

public class BookCreate
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int? Rating { get; set; }
    public string? Review { get; set; }
    public List<int>? AuthorIds { get; set; }
    public int? VolumeId { get; set; }
}
