import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ElevatorService } from './services/elevator.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule], // Combina ambos valores en una lista
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' // Cambié "styleUrl" a "styleUrls" (error menor)
})




export class AppComponent implements OnInit {
  title = 'ElevatorControlAPP';
  elevatorState: any;

  constructor(private elevatorService: ElevatorService) {}

  ngOnInit(): void {
    this.updateState();
  }

  updateState(): void {
    this.elevatorService.getState().subscribe((state) => {
      this.elevatorState = state;
    });
  }

  callElevator(): void {
    const floor = prompt('¿A qué piso deseas llamar el ascensor?');
    if (floor !== null) {
      this.elevatorService.callElevator(Number(floor)).subscribe(() => this.updateState());
    }
  }

  openDoors(): void {
    this.elevatorService.openDoors().subscribe(() => this.updateState());
  }

  closeDoors(): void {
    this.elevatorService.closeDoors().subscribe(() => this.updateState());
  }

  startElevator(): void {
    this.elevatorService.startElevator().subscribe(() => this.updateState());
  }

  stopElevator(): void {
    this.elevatorService.stopElevator().subscribe(() => this.updateState());
  }
}
