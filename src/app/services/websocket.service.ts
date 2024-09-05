import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws!: WebSocket;
  
  // BehaviorSubject to store and share the latest telemetry data
  private telemetrySubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public telemetry$: Observable<any> = this.telemetrySubject.asObservable();

  constructor() {
    this.connect(environment.wsUrl); // Start WebSocket connection when service is created
  }

  private connect(url: string): void {
    this.ws = new WebSocket(url);

    this.ws.onmessage = event => {
      const data = JSON.parse(event.data);

      // Update the BehaviorSubject with the latest data
      this.telemetrySubject.next(data);
    };

    this.ws.onerror = event => {
      console.error('WebSocket error:', event);
    };

    this.ws.onclose = event => {
      console.log('WebSocket connection closed');
    };
  }

  // If you need to send messages to the server
  public sendMessage(data: any): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  // Use this to manually close the WebSocket connection
  public closeConnection(): void {
    this.ws.close();
  }
}
