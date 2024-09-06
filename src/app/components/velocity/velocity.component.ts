import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-velocity',
  standalone: true,
  imports: [],
  templateUrl: './velocity.component.html',
  styleUrl: './velocity.component.css'
})
export class VelocityComponent implements OnInit {
  public velocity: any = 0;
  private dataTimeout: any;
  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    // Subscribe to the telemetry data from the WebSocket
    this.wsService.telemetry$.subscribe((data) => {
      if (data && data.velocity != null) {
        // Convert velocity from m/s to km/h and update the value
        this.velocity = (data.velocity * 3.6).toFixed(2);

        // Clear any existing timeout when new data is received
        clearTimeout(this.dataTimeout);

        // Set a timeout to reset the velocity if no data is received after 5 seconds
        this.dataTimeout = setTimeout(() => {
          this.resetVelocity(); // Reset the velocity after the timeout
        }, 5000); // 5 seconds
      }
    });
  }

  // Reset the velocity value if no new data comes in
  resetVelocity(): void {
    this.velocity = 0;
    
  }
}