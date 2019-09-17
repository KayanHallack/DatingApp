using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class NewUserDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 3, ErrorMessage = "Your password must have between 3 and 8 characters")]
        public string Password { get; set; }
    }
}
