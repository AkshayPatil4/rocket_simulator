import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';


@Component({
  selector: 'app-fuel-oxidizer-levels',
  standalone: true,
  imports: [],
  templateUrl: './fuel-oxidizer-levels.component.html',
  styleUrl: './fuel-oxidizer-levels.component.css'
})
export class FuelOxidizerLevelsComponent implements OnInit {
  public fuelLevel: number = 100; // Start at 100%
  public oxidizerLevel: number = 100; // Start at 100%

  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    // Subscribe to the telemetry data from the WebSocket
    this.wsService.telemetry$.subscribe((data) => {
      if (data && data.fuelLevel != null) {
        this.fuelLevel = data.fuelLevel.toFixed(2);
      }
      if (data && data.oxidizerLevel != null) {
        this.oxidizerLevel = data.oxidizerLevel.toFixed(2);
      }
    });
  }
}