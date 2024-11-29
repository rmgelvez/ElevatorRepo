import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElevatorService } from './services/elevator.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule], // Combina ambos valores en una lista
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' // Cambié "styleUrl" a "styleUrls" (error menor)
})




export class AppComponent implements OnInit {
  title = 'ElevatorControlApp';
  floors: number[] = [0, 1, 2, 3, 4]; // Pisos disponibles
  currentFloor: number = 0; // Piso actual del ascensor
  isMoving: boolean = false; // Estado del movimiento
  isDoorsOpen: boolean = false; // Estado de las puertas
  isInTransit: boolean = false; // Indicador de que el ascensor está en tránsito
  constructor(private elevatorService: ElevatorService) {}

  ngOnInit(): void {
    this.updateState();
    setInterval(() => this.updateState(), 1000); // Actualiza cada segundo
  }

  callElevator(floor: number): void {
    this.elevatorService.callElevator(floor).subscribe(() => {
      this.isMoving = true; // Cambia el estado a "moviendo"
    });
  }

  openDoors(): void {
    this.elevatorService.openDoors().subscribe(() => {
      this.isDoorsOpen = true;
      this.updateState();
    });
  }

  closeDoors(): void {
    this.elevatorService.closeDoors().subscribe(() => {
      this.isDoorsOpen = false;
      this.updateState();
    });
  }

  startElevator(): void {
    this.elevatorService.startElevator().subscribe(() => {
      this.isMoving = true;
      this.updateState();
    });
  }

  stopElevator(): void {
    this.elevatorService.stopElevator().subscribe(() => {
      this.isMoving = false;
      this.updateState();
    });
  }

  updateState(): void {
    this.elevatorService.getState().subscribe((state) => {
      this.currentFloor = state.currentFloor;
      this.isMoving = state.isMoving;
      this.isDoorsOpen = state.doorsOpen;
    });
  }
}