using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Author> Authors { get; set; } = null!;
    public DbSet<Book> Books { get; set; } = null!;
    public DbSet<Bookshelf> Bookshelves { get; set; } = null!;
    public DbSet<ReadLog> ReadLogs { get; set; } = null!;
    public DbSet<Shelving> Shelvings { get; set; } = null!;
    public DbSet<Volume> Volumes { get; set; } = null!;
    public DbSet<VolumeSet> VolumeSets { get; set; } = null!;
}
