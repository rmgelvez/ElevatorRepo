using ElevatorCore.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ElevatorControlAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ElevatorController : ControllerBase
    {
        private readonly Elevator _elevatorState;

        public ElevatorController(Elevator elevatorState)
        {
            _elevatorState = elevatorState;
        }

        [HttpGet]
        public IActionResult GetElevatorState()
        {
            return Ok(_elevatorState);
        }

        [HttpPost("call/{floor}")]
        public IActionResult CallElevator(int floor)
        {
            if (_elevatorState.IsMoving)
                return BadRequest(new { message = "El ascensor está en movimiento." });

            if (floor < 0)
                return BadRequest(new { message = "El piso no puede ser negativo." });

            _elevatorState.CurrentFloor = floor;
            return Ok(new { message = $"Ascensor llamado al piso {floor}" });
        }

        [HttpPost("doors/open")]
        public IActionResult OpenDoors()
        {
            if (_elevatorState.IsMoving)
                return BadRequest(new { message = "No se pueden abrir las puertas mientras el ascensor está en movimiento." });

            if (_elevatorState.DoorsOpen)
                return BadRequest(new { message = "Las puertas ya están abiertas." });

            _elevatorState.DoorsOpen = true;
            return Ok(new { message = "Puertas abiertas." });
        }

        [HttpPost("doors/close")]
        public IActionResult CloseDoors()
        {
            if (!_elevatorState.DoorsOpen)
                return BadRequest(new { message = "Las puertas ya están cerradas." });

            _elevatorState.DoorsOpen = false;
            return Ok(new { message = "Puertas cerradas." });
        }

        [HttpPost("start")]
        public IActionResult StartElevator()
        {
            if (_elevatorState.DoorsOpen)
                return BadRequest(new { message = "No se puede iniciar el ascensor con las puertas abiertas." });

            if (_elevatorState.IsMoving)
                return BadRequest(new { message = "El ascensor ya está en movimiento." });

            _elevatorState.IsMoving = true;
            return Ok(new { message = "El ascensor ha comenzado a moverse." });
        }

        [HttpPost("stop")]
        public IActionResult StopElevator()
        {
            if (!_elevatorState.IsMoving)
                return BadRequest(new { message = "El ascensor ya está detenido." });

            _elevatorState.IsMoving = false;
            return Ok(new { message = "El ascensor se ha detenido." });
        }
    }
}
