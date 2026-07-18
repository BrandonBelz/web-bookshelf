using Backend.Dtos.Volumes;

namespace Backend.Dtos.VolumeSets;

public class VolumeSetMinimized
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public List<VolumeMinimized> Volumes { get; set; } = null!;
}
