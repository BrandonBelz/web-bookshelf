using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Status { get; set; } = null!;
    public int? Rating { get; set; }
    public string? Review { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public int? VolumeId { get; set; }
    public Volume? Volume { get; set; }
    public List<Author> Authors { get; set; } = new List<Author>();
    public List<Shelving> Shelvings { get; set; } = new List<Shelving>();
    public List<ReadLog> ReadLogs { get; set; } = new List<ReadLog>();

    [NotMapped]
    public bool IsPartOfVolume => Volume != null && Volume.Title != null;
}
