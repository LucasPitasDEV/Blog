using Blog.DTO;
using Blog.Interfaces;
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
        private readonly IPostsRepository _postsRepository;

        public PostsController(AppDbContext context, IPostsRepository postsRepository)
        {
            _context = context;
            _postsRepository = postsRepository;
        }

        // POST /api/posts
        [HttpPost]
        public async Task<IActionResult> Create(CreatePostDto dto)
        {
            var result = await _postsRepository.Create(dto);
            return Ok(result);
        }

        // GET /api/posts?meus_posts=true
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool meus_posts = false)
        {
            var userId = 0;
            if (meus_posts)
            {
                userId = int.Parse(User.FindFirst("Id")!.Value);
            }

            var posts = await _postsRepository.GetAll(meus_posts, userId);

            return Ok(posts);
        }

        // GET /api/posts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _postsRepository.GetById(id);
            return Ok(result);
        }

        // PUT /api/posts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdatePostDto dto)
        {
            var result = await _postsRepository.Update(id, dto);
            return Ok(result);
        }

        // DELETE /api/posts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _postsRepository.Delete(id);
            return Ok(result);
        }
    }
}
