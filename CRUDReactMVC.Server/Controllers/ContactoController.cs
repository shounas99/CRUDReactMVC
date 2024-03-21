using CRUDReactMVC.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDReactMVC.Server.Controllers
{
    /* [Route("api")]*/
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly CrudreactMvcContext _context;
        public ContactoController(CrudreactMvcContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("lista")]
        public async Task<IActionResult> Lista()
        {
            var lista = await _context.Contactos.OrderByDescending(x => x.IdContacto).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);

        }
        [Route("lista2")]
        public async Task<IActionResult> Lista2()
        {
            return StatusCode(StatusCodes.Status200OK, "Hola2");

        }
        [HttpPost]
        [Route("guardar")] 
        public async Task<IActionResult> Guardar([FromBody] Contacto request)
        {
            await _context.Contactos.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created);
        }
        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> Editar([FromBody] Contacto request)
        {
            _context.Contactos.Update(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK);
        }
        [HttpDelete]
        [Route("eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var contacto = _context.Contactos.FirstOrDefault(x => x.IdContacto == id);
            if(contacto != null)
            {
                _context.Remove(contacto);
                await _context.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
        }

    }
}
