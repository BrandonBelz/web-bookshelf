using Backend.Data;
using Backend.Dtos.VolumeSets;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class VolumeSetRepository
{
    private readonly AppDbContext _context;

    public VolumeSetRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<VolumeSet> CreateVolumeSetAsync(VolumeSetCreateDto dto)
    {
        List<Volume> volumes = new();
        var queriableVolumes = _context.Volumes.Include(v => v.Books).ThenInclude(b => b.Authors);
        if (dto.VolumeIds != null)
        {
            foreach (int volumeId in dto.VolumeIds)
            {
                Volume? volume = await queriableVolumes.FirstOrDefaultAsync(v => v.Id == volumeId);
                if (volume != null)
                {
                    volumes.Add(volume);
                }
            }
        }

        VolumeSet volumeSet = new VolumeSet { Title = dto.Title, Volumes = volumes };

        await _context.VolumeSets.AddAsync(volumeSet);
        await _context.SaveChangesAsync();
        return volumeSet;
    }

    public async Task<VolumeSet?> GetVolumeSetByIdAsync(int id)
    {
        return await _context
            .VolumeSets.Include(vs => vs.Volumes)
                .ThenInclude(v => v.Books)
                    .ThenInclude(b => b.Authors)
            .FirstOrDefaultAsync(vs => vs.Id == id);
    }

    public async Task<List<VolumeSet>> GetAllVolumeSetsAsync()
    {
        return await _context
            .VolumeSets.Include(vs => vs.Volumes)
                .ThenInclude(v => v.Books)
                    .ThenInclude(b => b.Authors)
            .ToListAsync();
    }

    public async Task<VolumeSet?> DeleteVolumeSetAsync(int id)
    {
        VolumeSet? volumeSet = await _context.VolumeSets.FindAsync(id);
        if (volumeSet != null)
        {
            _context.VolumeSets.Remove(volumeSet);
            await _context.SaveChangesAsync();
        }
        return volumeSet;
    }
}
