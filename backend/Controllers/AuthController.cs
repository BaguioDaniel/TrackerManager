using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            ApplicationDbContext context,
            IAuthService authService,
            ILogger<AuthController> logger)
        {
            _context = context;
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterResponse>> Register([FromBody] RegisterRequest request)
        {
            try
            {
                // Validate request
                if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                {
                    return BadRequest(new RegisterResponse
                    {
                        Success = false,
                        Message = "Email and password are required."
                    });
                }

                // Check if email already exists
                var filter = Builders<User>.Filter.Eq(u => u.Email, request.Email.ToLower());
                var existingUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
                
                if (existingUser != null)
                {
                    return BadRequest(new RegisterResponse
                    {
                        Success = false,
                        Message = "An account with this email already exists."
                    });
                }

                // Validate password length
                if (request.Password.Length < 6)
                {
                    return BadRequest(new RegisterResponse
                    {
                        Success = false,
                        Message = "Password must be at least 6 characters long."
                    });
                }

                // Hash password
                var passwordHash = _authService.HashPassword(request.Password);

                // Create new user
                var user = new User
                {
                    Email = request.Email.ToLower(),
                    PasswordHash = passwordHash,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Role = request.Role,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                // Save to database
                await _context.Users.InsertOneAsync(user);

                _logger.LogInformation($"User registered successfully: {user.Email}");

                // Return success response
                return Ok(new RegisterResponse
                {
                    Success = true,
                    Message = "Registration successful!",
                    User = new UserDto
                    {
                        Id = user.Id.ToString(),
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Role = user.Role,
                        CreatedAt = user.CreatedAt
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error during registration: {ex.Message}");
                return StatusCode(500, new RegisterResponse
                {
                    Success = false,
                    Message = "An error occurred during registration. Please try again."
                });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            try
            {
                // Validate request
                if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                {
                    return BadRequest(new LoginResponse
                    {
                        Success = false,
                        Message = "Email and password are required."
                    });
                }

                // Find user by email
                var filter = Builders<User>.Filter.Eq(u => u.Email, request.Email.ToLower());
                var user = await _context.Users.Find(filter).FirstOrDefaultAsync();

                if (user == null)
                {
                    return Unauthorized(new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid email or password."
                    });
                }

                // Verify password
                if (!_authService.VerifyPassword(request.Password, user.PasswordHash))
                {
                    return Unauthorized(new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid email or password."
                    });
                }

                // Check if user is active
                if (!user.IsActive)
                {
                    return Unauthorized(new LoginResponse
                    {
                        Success = false,
                        Message = "This account has been deactivated."
                    });
                }

                _logger.LogInformation($"User logged in successfully: {user.Email}");

                // Return success response
                return Ok(new LoginResponse
                {
                    Success = true,
                    Message = "Login successful!",
                    User = new UserDto
                    {
                        Id = user.Id.ToString(),
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Role = user.Role,
                        CreatedAt = user.CreatedAt
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error during login: {ex.Message}");
                return StatusCode(500, new LoginResponse
                {
                    Success = false,
                    Message = "An error occurred during login. Please try again."
                });
            }
        }
    }
}
