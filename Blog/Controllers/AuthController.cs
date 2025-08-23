using Blog.DTO;
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

        public AuthController(AppDbContext db, JwtService jwt)
        {
            this.db = db;
            this.jwt = jwt;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterRequest req)
        {
            // valida duplicidade
            if (await db.Usuarios.AnyAsync(u => u.Email == req.Email))
                return BadRequest("E-mail já cadastrado.");

            var user = new Usuario
            {
                Nome = req.Nome,
                Email = req.Email,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(req.Senha)
            };

            db.Usuarios.Add(user);
            await db.SaveChangesAsync();

            var token = jwt.GerarToken(user.Id, user.Nome, user.Email);
            return Ok(new Auth.AuthResponse(user.Id, user.Nome, user.Email, token));
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest req)
        {
            var user = await db.Usuarios.FirstOrDefaultAsync(u => u.Email == req.Email);

            if (user is null || !BCrypt.Net.BCrypt.Verify(req.Senha, user.SenhaHash))
                return Unauthorized("Credenciais inválidas.");

            var token = jwt.GerarToken(user.Id, user.Nome, user.Email);
            return Ok(new Auth.AuthResponse(user.Id, user.Nome, user.Email, token));
        }
    }
}
