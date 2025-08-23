using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Blog.Services
{
    public class JwtService : IJwtService
    {
        // Adicione um campo para IConfiguration
        private readonly IConfiguration config;
        public string GerarToken(long usuarioId, string nome, string email)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, usuarioId.ToString()),
                new(JwtRegisteredClaimNames.Email, email),
                new("name", nome)
            };

            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Adicione um construtor para injetar IConfiguration
        public JwtService(IConfiguration config)
        {
            this.config = config;
        }
    }
}
