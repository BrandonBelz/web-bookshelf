using Backend.Dtos.Authors;
using Backend.Dtos.ReadLogs;
using Backend.Dtos.Shelvings;
using Backend.Dtos.Volumes;

namespace Backend.Dtos.Books;

public class BookPublic
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int? Rating { get; set; }
    public string? Review { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<AuthorMinimized> Authors { get; set; } = null!;
    public List<ReadLogMinimized> ReadLogs { get; set; } = null!;
    public List<ShelvingMinimized> Shelvings { get; set; } = null!;
    public VolumeMinimized? Volume { get; set; }

    public bool IsPartOfVolume => Volume != null && Volume.Books.Count > 1;
    public bool IsOwned => Volume != null && Volume.IsOwned;
}
