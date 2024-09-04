const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const config = require('./config/config');
const telemetryService = require('./services/telemetryService');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',  // Allow only your frontend's domain
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
// Middleware
app.use(express.json());

// API Routes
app.use('/api', routes);

const server = app.listen(config.server.port, () => {
  logger.info(`Server running on http://localhost:${config.server.port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  logger.info('New client connected to WebSocket');

  const interval = setInterval(() => {
    telemetryService.updateTelemetryData(); // Update telemetry data
    const telemetryData = telemetryService.getTelemetryData();
    ws.send(JSON.stringify(telemetryData)); // Send the data to the client
  }, config.telemetry.interval);

  ws.on('close', () => {
    clearInterval(interval);
    logger.info('Client disconnected from WebSocket');
  });
});
