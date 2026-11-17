using Backend.Dtos.Books;
using System.Text.Json.Serialization;

namespace Backend.Dtos.Volumes;

public class VolumeMinimized
{
    public int Id { get; set; }
    [JsonIgnore]
    public string? StoredTitle { get; set; }
    public string Title => !string.IsNullOrWhiteSpace(StoredTitle)
        ? StoredTitle
        : Books.FirstOrDefault()?.Title ?? "Untitled";
    public string? Isbn { get; set; } = null!;
    public List<BookMinimized> Books { get; set; } = null!;
    public int? VolumeSetId { get; set; }
    public bool IsOwned { get; set; }
    public bool HasMultipleBooks => Books.Count > 1;
}
