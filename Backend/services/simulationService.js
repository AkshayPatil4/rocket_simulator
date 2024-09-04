class SimulationService {
    constructor() {
      this.isRunning = false; // Simulation starts in a stopped state
    }
  
    startSimulation() {
      this.isRunning = true;
    }
  
    stopSimulation() {
      this.isRunning = false;
    }
  
    getSimulationStatus() {
      return this.isRunning;
    }
  }
  
  module.exports = new SimulationService();
  