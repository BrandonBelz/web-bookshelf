using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class Volume
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public DateOnly? ObtainedDate { get; set; }
    public int Pages { get; set; }
    public string? Isbn { get; set; }
    public string? Publisher { get; set; }
    public DateOnly? PublishedDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public int? SetId { get; set; }
    public VolumeSet? Set { get; set; }
    public List<Book> Books { get; set; } = new List<Book>();

    [NotMapped]
    public bool IsOwned => ObtainedDate != null;
}
