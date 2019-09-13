using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repository;

        public AuthController(IAuthRepository repository)
        {
            this.repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(NewUserDto newUserDto)
        {
            //Validate Request
            newUserDto.Username = newUserDto.Username.ToLower();

            if (await repository.UserExists(newUserDto.Username))
            {
                return BadRequest("Username already in use");
            }

            var newUser = new User
            {
                Username = newUserDto.Username
            };

            var user = await repository.Register(newUser, newUserDto.Password);

            return StatusCode(201);
        }

    }
}
