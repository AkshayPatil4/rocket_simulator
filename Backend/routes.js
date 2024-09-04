const express = require('express');
const router = express.Router();
const telemetryController = require('./controllers/telemetryController');
const simulationController = require('./controllers/simulationController');

// Telemetry data route
router.get('/telemetry', telemetryController.getTelemetryData);

// Simulation control routes
router.post('/simulation/start', simulationController.startSimulation);
router.post('/simulation/stop', simulationController.stopSimulation);
router.get('/simulation/status', simulationController.getSimulationStatus);

module.exports = router;
