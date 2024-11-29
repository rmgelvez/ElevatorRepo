// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ElevatorService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElevatorService {
  private apiUrl = 'https://localhost:44319/api/elevator'; // URL del backend

  constructor(private http: HttpClient) {}

  getState(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  callElevator(floor: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/call/${floor}`, {});
  }

  openDoors(): Observable<any> {
    return this.http.post(`${this.apiUrl}/doors/open`, {});
  }

  closeDoors(): Observable<any> {
    return this.http.post(`${this.apiUrl}/doors/close`, {});
  }

  startElevator(): Observable<any> {
    return this.http.post(`${this.apiUrl}/start`, {});
  }

  stopElevator(): Observable<any> {
    return this.http.post(`${this.apiUrl}/stop`, {});
  }
}

