using Blog.DTO;
using Blog.Interfaces;
using Blog.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Repository
{
    public class PostsRepository : IPostsRepository
    {
        private readonly AppDbContext _context;
        private readonly IAuthRepository _authRepository;

        public PostsRepository(AppDbContext context, IAuthRepository authRepository)
        {
            _context = context;
            _authRepository = authRepository;
        }
        public async Task<object> Create(CreatePostDto dto)
        {
            var post = new Publicacao
            {
                Titulo = dto.Titulo,
                Conteudo = dto.Conteudo,
                DataCriacao = DateTime.UtcNow,
                UsuarioId = dto.userId
            };

            _context.Publicacao.Add(post);
            await _context.SaveChangesAsync();

            var result = new PostagemDto
            {
                Id = (int)post.Id,
                Titulo = post.Titulo,
                Conteudo = post.Conteudo,
                DataCriacao = post.DataCriacao,
                AutorNome = _authRepository.GetUserNameById(dto.userId) ?? "Autor"
            };

            return result;
        }

        public async Task<object> GetAll([FromQuery] bool meus_posts = false, int userId = 0)
        {
            IQueryable<Publicacao> query = _context.Publicacao.Include(p => p.Usuario);

            if (meus_posts)
            {
                query = query.Where(p => p.UsuarioId == userId);
            }


            var posts = await query
                .OrderByDescending(p => p.DataCriacao)
                .Select(p => new PostagemDto
                {
                    Id = (int)p.Id,
                    Titulo = p.Titulo,
                    Conteudo = p.Conteudo,
                    DataCriacao = p.DataCriacao,
                    AutorNome = p.Usuario != null ? p.Usuario.Nome : string.Empty
                })
                .ToListAsync();

            return posts;
        }

        public async Task<object> GetById(int id)
        {
            var post = await _context.Publicacao
                .Include(p => p.Usuario)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null) return new object();

            // No método GetById, ajuste a atribuição de AutorNome para evitar referência nula.

            var result = new PostagemDto
            {
                Id = (int)post.Id,
                Titulo = post.Titulo,
                Conteudo = post.Conteudo,
                DataCriacao = post.DataCriacao,
                AutorNome = post.Usuario != null ? post.Usuario.Nome : string.Empty,
                userId = (int)post.UsuarioId
            };

            return result;
        }

        public async Task<bool> Update(int id, UpdatePostDto dto)
        {
            var post = _context.Publicacao.FirstOrDefault(p => p.Id == id);
            if (post == null)
            {
                return false;
            }

            post.Titulo = dto.Titulo;
            post.Conteudo = dto.Conteudo;
            post.UsuarioId = dto.userId;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var post = _context.Publicacao.FirstOrDefault(p => p.Id == id);
            if (post == null) return false;

            _context.Publicacao.Remove(post);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
