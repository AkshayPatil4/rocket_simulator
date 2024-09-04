const simulationService = require('../services/simulationService');

exports.startSimulation = (req, res) => {
  simulationService.startSimulation();
  res.json({ message: "Simulation started" });
};

exports.stopSimulation = (req, res) => {
  simulationService.stopSimulation();
  res.json({ message: "Simulation stopped" });
};

exports.getSimulationStatus = (req, res) => {
  res.json({ running: simulationService.getSimulationStatus() });
};
