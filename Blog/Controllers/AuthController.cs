using Blog.DTO;
using Blog.Interfaces;
using Blog.Models;
using Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Blog.DTO.Auth;

namespace Blog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext db;
        private readonly JwtService jwt;
        private readonly IAuthRepository _authRepository;

        public AuthController(AppDbContext db, JwtService jwt, IAuthRepository authRepository)
        {
            this.db = db;
            this.jwt = jwt;
            _authRepository = authRepository;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterRequest req)
        {
           var result = await _authRepository.Register(req);
            return Ok(result.Value);
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest req)
        {
            var result = await _authRepository.Login(req);
            return Ok(result.Value);
        }
    }
}
