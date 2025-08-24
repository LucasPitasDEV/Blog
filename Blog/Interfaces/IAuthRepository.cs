using Microsoft.AspNetCore.Mvc;
using static Blog.DTO.Auth;

namespace Blog.Interfaces
{
    public interface IAuthRepository
    {
        string? GetUserNameById(int userId);
        Task<ActionResult<AuthResponse>> Login(LoginRequest req);

        Task<ActionResult<AuthResponse>> Register(RegisterRequest req);
    }
}
