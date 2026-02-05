using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetProjects()
        {
            return Ok(new[] { "Project A", "Project B" });
        }
    }
}
