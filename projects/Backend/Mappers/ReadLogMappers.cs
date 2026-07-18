using Backend.Dtos.ReadLogs;
using Backend.Models;

namespace Backend.Mappers;

public static class ReadLogMappers
{
    public static ReadLogMinimized ToReadLogMinimized(this ReadLog readLog)
    {
        return new ReadLogMinimized
        {
            Id = readLog.Id,
            Book = readLog.Book.ToBookMinimized(),
            StartDate = readLog.StartDate,
            EndDate = readLog.EndDate,
        };
    }
}
