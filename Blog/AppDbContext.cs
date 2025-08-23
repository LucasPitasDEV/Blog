using Blog.Models;
using Microsoft.EntityFrameworkCore;

namespace Blog
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<Usuario> Usuarios => Set<Usuario>();
        public DbSet<Publicacao> Publicacao => Set<Publicacao>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(e =>
            {
                e.HasIndex(u => u.Email).IsUnique();
                e.Property(u => u.Nome).HasMaxLength(120).IsRequired();
                e.Property(u => u.Email).HasMaxLength(160).IsRequired();
                e.Property(u => u.SenhaHash).HasMaxLength(200).IsRequired();
            });

            modelBuilder.Entity<Publicacao>(e =>
            {
                e.Property(p => p.Titulo).HasMaxLength(160).IsRequired();
                e.Property(p => p.Conteudo).IsRequired();
                e.Property(p => p.DataCriacao).IsRequired();
                e.HasOne(p => p.Usuario)
                    .WithMany(u => u.Publicacao)
                    .HasForeignKey(p => p.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
