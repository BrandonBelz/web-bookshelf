namespace Backend.Dtos.Volumes;

public class VolumeCreateDto
{
    public string? Title { get; set; }
    public DateOnly? ObtainedDate { get; set; }
    public int Pages { get; set; }
    public string? Isbn { get; set; }
    public string? Publisher { get; set; }
    public DateOnly? PublishedDate { get; set; }
    public int? SetId { get; set; }
    public List<int>? BookIds { get; set; }
}
