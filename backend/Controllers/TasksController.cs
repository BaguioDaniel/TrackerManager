using backend.Data;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly ILogger<TasksController> _logger;

        public TasksController(ITaskService taskService, ILogger<TasksController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<TasksListResponse>> GetUserTasks(string userId)
        {
            try
            {
                var tasks = await _taskService.GetUserTasksAsync(userId);
                return Ok(new TasksListResponse
                {
                    Success = true,
                    Tasks = tasks
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting user tasks: {ex.Message}");
                return StatusCode(500, new TasksListResponse
                {
                    Success = false,
                    Message = "An error occurred while fetching tasks."
                });
            }
        }

        [HttpGet("project/{projectSlug}")]
        public async Task<ActionResult<TasksListResponse>> GetProjectTasks(string projectSlug)
        {
            try
            {
                var tasks = await _taskService.GetProjectTasksAsync(projectSlug);
                return Ok(new TasksListResponse
                {
                    Success = true,
                    Tasks = tasks
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting project tasks: {ex.Message}");
                return StatusCode(500, new TasksListResponse
                {
                    Success = false,
                    Message = "An error occurred while fetching project tasks."
                });
            }
        }

        [HttpGet("all")]
        public async Task<ActionResult<TasksListResponse>> GetAllTasks()
        {
            try
            {
                var tasks = await _taskService.GetAllTasksAsync();
                return Ok(new TasksListResponse
                {
                    Success = true,
                    Tasks = tasks
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting all tasks: {ex.Message}");
                return StatusCode(500, new TasksListResponse
                {
                    Success = false,
                    Message = "An error occurred while fetching tasks."
                });
            }
        }

        [HttpGet("{taskId}")]
        public async Task<ActionResult<TaskResponse>> GetTaskById(string taskId)
        {
            try
            {
                var task = await _taskService.GetTaskByIdAsync(taskId);
                if (task == null)
                {
                    return NotFound(new TaskResponse
                    {
                        Success = false,
                        Message = "Task not found."
                    });
                }

                return Ok(new TaskResponse
                {
                    Success = true,
                    Task = task
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting task: {ex.Message}");
                return StatusCode(500, new TaskResponse
                {
                    Success = false,
                    Message = "An error occurred while fetching the task."
                });
            }
        }

        [HttpPost]
        public async Task<ActionResult<TaskResponse>> CreateTask([FromBody] CreateTaskRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Title))
                {
                    return BadRequest(new TaskResponse
                    {
                        Success = false,
                        Message = "Task title is required."
                    });
                }

                if (string.IsNullOrWhiteSpace(request.ProjectSlug))
                {
                    return BadRequest(new TaskResponse
                    {
                        Success = false,
                        Message = "Project slug is required."
                    });
                }

                // For now, use a placeholder user ID - in production, extract from JWT
                var userId = request.AssignedTo ?? "507f1f77bcf86cd799439011";

                var task = await _taskService.CreateTaskAsync(request, userId);
                return CreatedAtAction(nameof(GetTaskById), new { taskId = task.Id }, new TaskResponse
                {
                    Success = true,
                    Message = "Task created successfully.",
                    Task = task
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating task: {ex.Message}");
                return StatusCode(500, new TaskResponse
                {
                    Success = false,
                    Message = "An error occurred while creating the task."
                });
            }
        }

        [HttpPut("{taskId}")]
        public async Task<ActionResult<TaskResponse>> UpdateTask(string taskId, [FromBody] UpdateTaskRequest request)
        {
            try
            {
                var task = await _taskService.UpdateTaskAsync(taskId, request);
                if (task == null)
                {
                    return NotFound(new TaskResponse
                    {
                        Success = false,
                        Message = "Task not found."
                    });
                }

                return Ok(new TaskResponse
                {
                    Success = true,
                    Message = "Task updated successfully.",
                    Task = task
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating task: {ex.Message}");
                return StatusCode(500, new TaskResponse
                {
                    Success = false,
                    Message = "An error occurred while updating the task."
                });
            }
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(string taskId)
        {
            try
            {
                var success = await _taskService.DeleteTaskAsync(taskId);
                if (!success)
                {
                    return NotFound(new TaskResponse
                    {
                        Success = false,
                        Message = "Task not found."
                    });
                }

                return Ok(new TaskResponse
                {
                    Success = true,
                    Message = "Task deleted successfully."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting task: {ex.Message}");
                return StatusCode(500, new TaskResponse
                {
                    Success = false,
                    Message = "An error occurred while deleting the task."
                });
            }
        }
    }
}
