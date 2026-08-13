namespace Backend.Dtos.VolumeSets;

public class VolumeSetCreateDto
{
    public string Title { get; set; } = null!;
    public List<int>? VolumeIds { get; set; }
}
