using ElevatorCore.Entities;
using Microsoft.AspNetCore.Mvc;


namespace ElevatorControlAPI
{
    [ApiController]
    [Route("api/[controller]")]
    public class ElevatorController : ControllerBase
    {
        Elevator ElevatorState = new Elevator();

        [HttpGet]
        public IActionResult GetElevatorState()
        {
            return Ok(ElevatorState);
        }

        [HttpPost("call/{floor}")]
        public IActionResult CallElevator(int floor)
        {
            if (ElevatorState.IsMoving)
                return BadRequest("El ascensor está en movimiento.");

            ElevatorState.CurrentFloor = floor;
            return Ok($"Ascensor llamado al piso {floor}");
        }

        [HttpPost("doors/open")]
        public IActionResult OpenDoors()
        {
            if (ElevatorState.IsMoving)
                return BadRequest("No se pueden abrir las puertas mientras el ascensor está en movimiento.");

            ElevatorState.DoorsOpen = true;
            return Ok("Puertas abiertas.");
        }

        [HttpPost("doors/close")]
        public IActionResult CloseDoors()
        {
            ElevatorState.DoorsOpen = false;
            return Ok("Puertas cerradas.");
        }

        [HttpPost("start")]
        public IActionResult StartElevator()
        {
            if (ElevatorState.DoorsOpen)
                return BadRequest("No se puede iniciar el ascensor con las puertas abiertas.");

            ElevatorState.IsMoving = true;
            return Ok("El ascensor ha comenzado a moverse.");
        }

        [HttpPost("stop")]
        public IActionResult StopElevator()
        {
            ElevatorState.IsMoving = false;
            return Ok("El ascensor se ha detenido.");
        }
    }
}
