namespace Blog.DTO
{
    public class Auth
    {
        public record RegisterRequest(string Nome, string Email, string Senha);
        public record LoginRequest(string Email, string Senha);
        public record AuthResponse(long Id, string Nome, string Email, string Token);
    }
}
