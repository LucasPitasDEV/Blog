namespace Blog.DTO
{
    public class PostagemDto
    {
        public int userId { get; set; }
        public int Id { get; set; }
        public string Titulo { get; set; } = null!;
        public string Conteudo { get; set; } = null!;
        public DateTime DataCriacao { get; set; }
        public string AutorNome { get; set; } = null!;
    }
}