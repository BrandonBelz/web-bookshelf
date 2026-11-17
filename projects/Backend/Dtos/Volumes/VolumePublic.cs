using Backend.Dtos.Books;
using Backend.Dtos.VolumeSets;
using System.Text.Json.Serialization;

namespace Backend.Dtos.Volumes;

public class VolumePublic
{
    public int Id { get; set; }
    [JsonIgnore]
    public string? StoredTitle { get; set; }
    public string Title => !string.IsNullOrWhiteSpace(StoredTitle)
        ? StoredTitle
        : Books.FirstOrDefault()?.Title ?? "Untitled";
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
    public bool HasMultipleBooks => Books.Count > 1;
}
