using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElevatorCore.Entities
{
    public class Elevator
    {
        public int CurrentFloor { get; set; } = 0;
        public bool IsMoving { get; set; } = false;
        public bool DoorsOpen { get; set; } = false;
        public DateTime? MovementEndTime { get; set; } = null;

    }

}
