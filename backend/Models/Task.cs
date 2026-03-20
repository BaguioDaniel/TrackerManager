using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TaskStatus
    {
        ToDo,
        InProgress,
        Completed
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TaskPriority
    {
        Low,
        Medium,
        High,
        Critical
    }

    public class Task
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("title")]
        public required string Title { get; set; }

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("projectSlug")]
        public required string ProjectSlug { get; set; }

        [BsonElement("assignedTo")]
        public ObjectId? AssignedTo { get; set; }

        [BsonElement("status")]
        public TaskStatus Status { get; set; } = TaskStatus.ToDo;

        [BsonElement("priority")]
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;

        [BsonElement("dueDate")]
        public DateTime? DueDate { get; set; }

        [BsonElement("createdBy")]
        public required ObjectId CreatedBy { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;
    }
}
