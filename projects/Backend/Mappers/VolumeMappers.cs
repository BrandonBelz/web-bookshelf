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
            VolumeSet = volume.Set?.ToVolumeSetMinimized(),
            IsOwned = volume.IsOwned,
        };
    }
}
