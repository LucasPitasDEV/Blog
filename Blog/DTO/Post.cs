namespace Blog.DTO
{
    public class Post
    {
        public record PostCreateDto(string Titulo, string Conteudo);
        public record PostUpdateDto(string Titulo, string Conteudo);
        public record PostListItemDto(long Id, string Titulo, string Autor, DateTime DataCriacao);
        public record PostDetailDto(long Id, string Titulo, string Conteudo, DateTime DataCriacao,
        long AutorId, string AutorNome);
    }
}
