using Backend.Dtos.Volumes;

namespace Backend.Dtos.VolumeSets;

public class VolumeSetPublic
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<VolumePublic> Volumes { get; set; } = new();
}
