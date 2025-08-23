using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Models
{
    public class Publicacao
    {
        [Column("id_publicacao")]
        public long Id { get; set; }
        [Column("ds_titulo")]
        public string Titulo { get; set; } = string.Empty;
        [Column("ds_conteudo")]
        public string Conteudo { get; set; } = string.Empty;
        [Column("dt_criacao")]
        public DateTime DataCriacao { get; set; }
        [Column ("usuario_id")]
        public long UsuarioId { get; set; }

        public Usuario? Usuario { get; set; }
    }
}
