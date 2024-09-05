import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelemetrydataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTelemetryData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/telemetry`);
  }

  startSimulation(): Observable<any> {
    return this.http.post(`${this.apiUrl}/simulation/start`, {});
  }

  stopSimulation(): Observable<any> {
    return this.http.post(`${this.apiUrl}/simulation/stop`, {});
  }
}