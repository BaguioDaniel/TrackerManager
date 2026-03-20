using backend.Data;
using backend.DTOs;
using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Services
{
    public interface ITaskService
    {
        Task<TaskDto?> GetTaskByIdAsync(string taskId);
        Task<List<TaskDto>> GetAllTasksAsync();
        Task<List<TaskDto>> GetUserTasksAsync(string userId);
        Task<List<TaskDto>> GetProjectTasksAsync(string projectSlug);
        Task<TaskDto> CreateTaskAsync(CreateTaskRequest request, string userId);
        Task<TaskDto?> UpdateTaskAsync(string taskId, UpdateTaskRequest request);
        Task<bool> DeleteTaskAsync(string taskId);
    }

    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TaskService> _logger;

        public TaskService(ApplicationDbContext context, ILogger<TaskService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<TaskDto?> GetTaskByIdAsync(string taskId)
        {
            try
            {
                if (!ObjectId.TryParse(taskId, out var objectId))
                    return null;

                var filter = Builders<Task>.Filter.Eq(t => t.Id, objectId);
                var task = await _context.Tasks.Find(filter).FirstOrDefaultAsync();

                return task != null ? MapToDto(task) : null;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting task by ID: {ex.Message}");
                return null;
            }
        }

        public async Task<List<TaskDto>> GetAllTasksAsync()
        {
            try
            {
                var filter = Builders<Task>.Filter.Eq(t => t.IsActive, true);
                var tasks = await _context.Tasks.Find(filter).ToListAsync();
                return tasks.Select(MapToDto).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting all tasks: {ex.Message}");
                return new List<TaskDto>();
            }
        }

        public async Task<List<TaskDto>> GetUserTasksAsync(string userId)
        {
            try
            {
                if (!ObjectId.TryParse(userId, out var objectId))
                    return new List<TaskDto>();

                var filter = Builders<Task>.Filter.And(
                    Builders<Task>.Filter.Eq(t => t.AssignedTo, objectId),
                    Builders<Task>.Filter.Eq(t => t.IsActive, true)
                );
                var tasks = await _context.Tasks.Find(filter).SortByDescending(t => t.CreatedAt).ToListAsync();
                return tasks.Select(MapToDto).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting user tasks: {ex.Message}");
                return new List<TaskDto>();
            }
        }

        public async Task<List<TaskDto>> GetProjectTasksAsync(string projectSlug)
        {
            try
            {
                var filter = Builders<Task>.Filter.And(
                    Builders<Task>.Filter.Eq(t => t.ProjectSlug, projectSlug),
                    Builders<Task>.Filter.Eq(t => t.IsActive, true)
                );
                var tasks = await _context.Tasks.Find(filter).SortByDescending(t => t.CreatedAt).ToListAsync();
                return tasks.Select(MapToDto).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting project tasks: {ex.Message}");
                return new List<TaskDto>();
            }
        }

        public async Task<TaskDto> CreateTaskAsync(CreateTaskRequest request, string userId)
        {
            try
            {
                if (!ObjectId.TryParse(userId, out var userObjectId))
                    throw new ArgumentException("Invalid userId");

                ObjectId? assignedToId = null;
                if (!string.IsNullOrEmpty(request.AssignedTo) && ObjectId.TryParse(request.AssignedTo, out var assignedObjectId))
                {
                    assignedToId = assignedObjectId;
                }

                var task = new Task
                {
                    Title = request.Title,
                    Description = request.Description,
                    ProjectSlug = request.ProjectSlug,
                    AssignedTo = assignedToId,
                    Status = request.Status,
                    Priority = request.Priority,
                    DueDate = request.DueDate,
                    CreatedBy = userObjectId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                await _context.Tasks.InsertOneAsync(task);
                _logger.LogInformation($"Task created: {task.Id} by user {userId}");

                return MapToDto(task);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating task: {ex.Message}");
                throw;
            }
        }

        public async Task<TaskDto?> UpdateTaskAsync(string taskId, UpdateTaskRequest request)
        {
            try
            {
                if (!ObjectId.TryParse(taskId, out var objectId))
                    return null;

                var updateBuilder = Builders<Task>.Update
                    .Set(t => t.UpdatedAt, DateTime.UtcNow);

                if (!string.IsNullOrEmpty(request.Title))
                    updateBuilder = updateBuilder.Set(t => t.Title, request.Title);

                if (request.Description != null)
                    updateBuilder = updateBuilder.Set(t => t.Description, request.Description);

                if (!string.IsNullOrEmpty(request.ProjectSlug))
                    updateBuilder = updateBuilder.Set(t => t.ProjectSlug, request.ProjectSlug);

                if (request.Status.HasValue)
                    updateBuilder = updateBuilder.Set(t => t.Status, request.Status.Value);

                if (request.Priority.HasValue)
                    updateBuilder = updateBuilder.Set(t => t.Priority, request.Priority.Value);

                if (request.DueDate.HasValue)
                    updateBuilder = updateBuilder.Set(t => t.DueDate, request.DueDate);

                if (!string.IsNullOrEmpty(request.AssignedTo))
                {
                    if (ObjectId.TryParse(request.AssignedTo, out var assignedObjectId))
                        updateBuilder = updateBuilder.Set(t => t.AssignedTo, assignedObjectId);
                }

                var filter = Builders<Task>.Filter.Eq(t => t.Id, objectId);
                var options = new FindOneAndUpdateOptions<Task> { ReturnDocument = ReturnDocument.After };
                var updatedTask = await _context.Tasks.FindOneAndUpdateAsync(filter, updateBuilder, options);

                if (updatedTask != null)
                    _logger.LogInformation($"Task updated: {taskId}");

                return updatedTask != null ? MapToDto(updatedTask) : null;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating task: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteTaskAsync(string taskId)
        {
            try
            {
                if (!ObjectId.TryParse(taskId, out var objectId))
                    return false;

                var filter = Builders<Task>.Filter.Eq(t => t.Id, objectId);
                var update = Builders<Task>.Update.Set(t => t.IsActive, false);
                var result = await _context.Tasks.UpdateOneAsync(filter, update);

                if (result.ModifiedCount > 0)
                    _logger.LogInformation($"Task soft-deleted: {taskId}");

                return result.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting task: {ex.Message}");
                return false;
            }
        }

        private TaskDto MapToDto(Task task)
        {
            return new TaskDto
            {
                Id = task.Id.ToString(),
                Title = task.Title,
                Description = task.Description,
                ProjectSlug = task.ProjectSlug,
                AssignedTo = task.AssignedTo?.ToString(),
                Status = task.Status,
                Priority = task.Priority,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };
        }
    }
}
