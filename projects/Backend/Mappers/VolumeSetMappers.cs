using Backend.Dtos.VolumeSets;
using Backend.Models;

namespace Backend.Mappers;

public static class VolumeSetMappers
{
    public static VolumeSetMinimized ToVolumeSetMinimized(this VolumeSet volumeSet)
    {
        return new VolumeSetMinimized
        {
            Id = volumeSet.Id,
            Title = volumeSet.Title,
            Volumes = volumeSet.Volumes.Select(v => v.ToVolumeMinimized()).ToList(),
        };
    }
}
