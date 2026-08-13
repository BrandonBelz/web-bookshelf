using Backend.Dtos.Books;

namespace Backend.Dtos.Volumes;

public class VolumeMinimized
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Isbn { get; set; } = null!;
    public List<BookMinimized> Books { get; set; } = null!;
    public int? VolumeSetId { get; set; }
    public bool IsOwned { get; set; }
}
