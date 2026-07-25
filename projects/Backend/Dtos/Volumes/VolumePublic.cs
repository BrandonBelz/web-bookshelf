using Backend.Dtos.Books;
using Backend.Dtos.VolumeSets;

namespace Backend.Dtos.Volumes;

public class VolumePublic
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public DateOnly? ObtainedDate { get; set; }
    public int Pages { get; set; }
    public string? Isbn { get; set; }
    public string? Publisher { get; set; }
    public DateOnly? PublishedDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public VolumeSetMinimized? Set { get; set; }
    public List<BookMinimized> Books { get; set; } = null!;
    public bool IsOwned { get; set; }
}
