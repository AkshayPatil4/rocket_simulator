class TelemetryData {
    constructor() {
      this.altitude = 0;  // in meters
      this.velocity = 0;  // in m/s
      this.fuelLevel = 100;  // in percentage
      this.oxidizerLevel = 100;  // in percentage
      this.thrust = 0;  // in kN
      this.engineTemperature = 20; // in Celsius
      this.internalTemperature = 20; // in Celsius
      this.externalTemperature = 20; // in Celsius
      this.atmosphericPressure = 101325; // in Pascals
      this.gyro = {
        pitch: 0, // in degrees
        yaw: 0,
        roll: 0,
      };
      this.angularVelocity = {
        x: 0, // in degrees/s
        y: 0,
        z: 0,
      };
      this.position = {
        latitude: 0,  // in degrees
        longitude: 0, // in degrees
      };
      this.time = new Date().toISOString();
    }
  }
  
  module.exports = TelemetryData;
  