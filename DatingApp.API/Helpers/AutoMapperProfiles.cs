using System.Linq;
using AutoMapper;
using DatingApp.API.DTO;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDetailsDto>()
                .ForMember(
                    dest => dest.PhotoUrl,
                    options => options.
                        MapFrom(src => src.Photos.
                            FirstOrDefault(i => i.IsMain).Url))
                .ForMember(
                    dest => dest.Age,
                    options => options.
                        MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserListDto>()
                .ForMember(
                    dest => dest.PhotoUrl,
                    options => options.
                        MapFrom(src => src.Photos.
                            FirstOrDefault(i => i.IsMain).Url))
                .ForMember(
                    dest => dest.Age,
                    options => options.
                        MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
        }
    }
}