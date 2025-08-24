using Blog.DTO;
using Blog.Interfaces;
using Blog.Models;
using Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Blog.DTO.Auth;

namespace Blog.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext db;
        private readonly JwtService jwt;

        public AuthRepository(AppDbContext db, JwtService jwt)
        {
            this.db = db;
            this.jwt = jwt;
        }
        public async Task<ActionResult<AuthResponse>> Register(RegisterRequest req)
        {
            // valida duplicidade
            if (await db.Usuarios.AnyAsync(u => u.Email == req.Email))
                return new BadRequestObjectResult("E-mail já cadastrado.");

            var user = new Usuario
            {
                Nome = req.Nome,
                Email = req.Email,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(req.Senha)
            };

            db.Usuarios.Add(user);
            await db.SaveChangesAsync();

            var token = jwt.GerarToken(user.Id, user.Nome, user.Email);
            return new Auth.AuthResponse(user.Id, user.Nome, user.Email, token);
        }

        public async Task<ActionResult<AuthResponse>> Login(LoginRequest req)
        {
            var user = await db.Usuarios.FirstOrDefaultAsync(u => u.Email == req.Email);

            if (user is null || !BCrypt.Net.BCrypt.Verify(req.Senha, user.SenhaHash))
                return new UnauthorizedObjectResult("Credenciais inválidas.");

            var token = jwt.GerarToken(user.Id, user.Nome, user.Email);
            return new Auth.AuthResponse(user.Id, user.Nome, user.Email, token);
        }

        public string? GetUserNameById(int userId)
        {
            var userTask = db.Usuarios.FirstOrDefaultAsync(u => u.Id == userId);
            var user = userTask.GetAwaiter().GetResult();
            return user?.Nome;
        }
    }
}
