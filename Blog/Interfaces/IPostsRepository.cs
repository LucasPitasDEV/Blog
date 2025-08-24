using Blog.DTO;
using Blog.Models;
using Blog.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Interfaces
{
    public interface IPostsRepository
    {
        Task<object> Create(CreatePostDto dto);

        Task<object> GetAll([FromQuery] bool meus_posts, int userId = 0);

        Task<object> GetById(int id);

        Task<bool> Update(int id, UpdatePostDto dto);

        Task<bool> Delete(int id);
        

    }
}
