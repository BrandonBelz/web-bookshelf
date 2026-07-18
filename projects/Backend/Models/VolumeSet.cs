using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class VolumeSet
{
    public int Id { get; set; }

    [MaxLength(255)]
    public string Title { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public List<Volume> Volumes { get; set; } = new List<Volume>();
}
