import { Component } from '@angular/core';
import { TelemetrydataService } from '../../services/telemetrydata.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  constructor(private telemetryService: TelemetrydataService) {}

  startSimulation() {
    this.telemetryService.startSimulation().subscribe(response => {
      console.log('Simulation started:', response);
    });
  }

  stopSimulation() {
    this.telemetryService.stopSimulation().subscribe(response => {
      console.log('Simulation stopped:', response);
    });
  }

  resetSimulation() {
    // Implement reset logic if necessary
    console.log('Simulation reset.');
  }

}

