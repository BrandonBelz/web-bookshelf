using Backend.Dtos.Authors;

namespace Backend.Dtos.Books
{
    public class BookMinimized
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public List<AuthorMinimized> Authors { get; set; } = null!;
    }
}
