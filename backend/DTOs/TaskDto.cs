using backend.Models;

namespace backend.DTOs
{
    public class TaskDto
    {
        public string? Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required string ProjectSlug { get; set; }
        public string? AssignedTo { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.ToDo;
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateTaskRequest
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required string ProjectSlug { get; set; }
        public string? AssignedTo { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.ToDo;
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;
        public DateTime? DueDate { get; set; }
    }

    public class UpdateTaskRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ProjectSlug { get; set; }
        public string? AssignedTo { get; set; }
        public TaskStatus? Status { get; set; }
        public TaskPriority? Priority { get; set; }
        public DateTime? DueDate { get; set; }
    }

    public class TaskResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public TaskDto? Task { get; set; }
    }

    public class TasksListResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public List<TaskDto>? Tasks { get; set; }
    }
}
