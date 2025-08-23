namespace Blog.DTO
{
    public class CreatePostDto
    {
        public string Titulo { get; set; } = null!;
        public string Conteudo { get; set; } = null!;
        public int userId { get; set; }
    }

}