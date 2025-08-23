using Blog.DTO;
using Blog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/posts")]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        // POST /api/posts
        [HttpPost]
        public async Task<IActionResult> Create(CreatePostDto dto)
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
                AutorNome = User.Identity!.Name ?? "Autor"
            };

            return Ok(result);
        }

        // GET /api/posts?meus_posts=true
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool meus_posts = false)
        {
            IQueryable<Publicacao> query = _context.Publicacao.Include(p => p.Usuario);

            if (meus_posts)
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
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

            return Ok(posts);
        }

        // GET /api/posts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var post = await _context.Publicacao
                .Include(p => p.Usuario)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null) return NotFound();

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

            return Ok(result);
        }

        // PUT /api/posts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdatePostDto dto)
        {
            var post = _context.Publicacao.FirstOrDefault(p => p.Id == id);
            if (post == null)
            {
                return NotFound();
            }

            post.Titulo = dto.Titulo;
            post.Conteudo = dto.Conteudo;
            post.UsuarioId = dto.userId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE /api/posts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await _context.Publicacao.FindAsync(id);
            if (post == null) return NotFound();

            var userId = int.Parse(User.FindFirst("Id")!.Value);
            if (post.UsuarioId != userId) return Forbid();

            _context.Publicacao.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
