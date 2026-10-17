
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DriveFull.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    [HttpGet("login")]
    public IActionResult Login()
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = "http://localhost:5173/"
        };

        return Challenge(
            properties,
            GoogleDefaults.AuthenticationScheme);
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        return Ok(new
        {
            authenticated = true,
            name = User.Identity?.Name,
            email = User.FindFirst(
                System.Security.Claims.ClaimTypes.Email
            )?.Value
        });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);

        return Ok(new
        {
            message = "បានចាកចេញពីគណនីដោយជោគជ័យ"
        });
    }
}
