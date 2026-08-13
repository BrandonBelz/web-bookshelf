using Backend.Dtos.Volumes;
using Backend.Models;

namespace Backend.Mappers;

public static class VolumeMappers
{
    public static VolumeMinimized ToVolumeMinimized(this Volume volume)
    {
        return new VolumeMinimized
        {
            Id = volume.Id,
            Title = volume.Title,
            Isbn = volume.Isbn,
            Books = volume.Books.Select(b => b.ToBookMinimized()).ToList(),
            VolumeSetId = volume.SetId,
            IsOwned = volume.IsOwned,
        };
    }

    public static VolumePublic ToVolumePublic(this Volume volume)
    {
        return new VolumePublic
        {
            Id = volume.Id,
            Title = volume.Title,
            ObtainedDate = volume.ObtainedDate,
            Pages = volume.Pages,
            Isbn = volume.Isbn,
            Publisher = volume.Publisher,
            PublishedDate = volume.PublishedDate,
            CreatedAt = volume.CreatedAt,
            UpdatedAt = volume.UpdatedAt,
            Set = volume.Set?.ToVolumeSetMinimized(),
            Books = volume.Books.Select(b => b.ToBookMinimized()).ToList(),
            IsOwned = volume.IsOwned,
        };
    }
}
