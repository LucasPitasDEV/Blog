using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Models
{
    public class Usuario
    {
        [Column("id_usuario")]
        public long Id { get; set; }
        [Column("nm_usuario")]
        public string Nome { get; set; } = string.Empty;
        [Column("ds_email")]
        public string Email { get; set; } = string.Empty;
        [Column("ds_senha_hash")]
        public string SenhaHash { get; set; } = string.Empty;
        public ICollection<Publicacao>? Publicacao { get; set; }
    }
}
