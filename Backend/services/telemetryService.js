const TelemetryData = require('../models/telemetryData');
const simulationService = require('./simulationService');

class TelemetryService {
  constructor() {
    this.telemetryData = new TelemetryData();
  }

  updateTelemetryData() {
    if (simulationService.getSimulationStatus()) {
      // Logic to update the telemetry data dynamically
      this.telemetryData.altitude += Math.random() * 50;
      this.telemetryData.velocity += Math.random() * 5;
      this.telemetryData.fuelLevel -= Math.random() * 0.5;
      this.telemetryData.oxidizerLevel -= Math.random() * 0.5;
      this.telemetryData.thrust = 1000 + Math.random() * 500;
      this.telemetryData.engineTemperature += Math.random() * 0.5 - 0.25;
      this.telemetryData.internalTemperature += Math.random() * 0.5 - 0.25;
      this.telemetryData.externalTemperature += Math.random() * 0.5 - 0.25;
      this.telemetryData.atmosphericPressure -= Math.random() * 100;
      this.telemetryData.gyro.pitch += Math.random() * 2 - 1;
      this.telemetryData.gyro.yaw += Math.random() * 2 - 1;
      this.telemetryData.gyro.roll += Math.random() * 2 - 1;
      this.telemetryData.angularVelocity.x += Math.random() * 0.2 - 0.1;
      this.telemetryData.angularVelocity.y += Math.random() * 0.2 - 0.1;
      this.telemetryData.angularVelocity.z += Math.random() * 0.2 - 0.1;
      this.telemetryData.position.latitude += Math.random() * 0.01 - 0.005;
      this.telemetryData.position.longitude += Math.random() * 0.01 - 0.005;

      // Ensure values stay within logical bounds
      
    }
  }

  getTelemetryData() {
    return this.telemetryData;
  }
}

module.exports = new TelemetryService();
