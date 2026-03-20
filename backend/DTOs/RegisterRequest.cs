using backend.Models;

namespace backend.DTOs
{
    public class RegisterRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public UserRole Role { get; set; } = UserRole.User;
    }
}
