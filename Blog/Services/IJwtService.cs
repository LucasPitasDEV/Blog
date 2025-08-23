namespace Blog.Services
{
    public interface IJwtService
    {
        string GerarToken(long usuarioId, string nome, string email);
    }
}
