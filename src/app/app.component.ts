import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { WebSocketService } from './services/websocket.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AltitudeComponent } from "./components/altitude/altitude.component";
import { VelocityComponent } from "./components/velocity/velocity.component";
import { FuelOxidizerLevelsComponent } from "./components/fuel-oxidizer-levels/fuel-oxidizer-levels.component";
import { EngineThrustTemperatureComponent } from "./components/engine-thrust-temperature/engine-thrust-temperature.component";
import { ExternalConditionsComponent } from "./components/external-conditions/external-conditions.component";
import { TrajectoryMapComponent } from "./components/trajectory-map/trajectory-map.component";
import { AttitudeVisualizationComponent } from "./components/attitude-visualization/attitude-visualization.component";
import { ControlPanelComponent } from "./components/control-panel/control-panel.component"; // Import for *ngIf, *ngFor
import { provideHttpClient } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, AltitudeComponent, VelocityComponent, FuelOxidizerLevelsComponent, EngineThrustTemperatureComponent, ExternalConditionsComponent, TrajectoryMapComponent, AttitudeVisualizationComponent, ControlPanelComponent, ChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
@ViewChild('sidenav') sidenav!: MatSidenav;
isSidenavOpen = false;
notifications = [
  { message: 'Fuel level low' },
  { message: 'Engine temperature rising' },
  { message: 'Trajectory deviation detected' },
];
toggleSidenav() {
  this.isSidenavOpen = !this.isSidenavOpen;
  if (this.isSidenavOpen) {
    this.sidenav.open(); // Open the sidenav
  } else {
    this.sidenav.close(); // Close the sidenav
  }
}
removeNotification(index: number) {
  this.notifications.splice(index, 1);
}


}

