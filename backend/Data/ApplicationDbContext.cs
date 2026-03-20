using backend.Models;
using MongoDB.Driver;

namespace backend.Data
{
    public class ApplicationDbContext
    {
        private readonly IMongoDatabase _database;

        public ApplicationDbContext(IMongoClient client, string databaseName = "TrackerManagerDb")
        {
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("users");
        public IMongoCollection<Task> Tasks => _database.GetCollection<Task>("tasks");
    }
}
