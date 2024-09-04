const telemetryService = require('../services/telemetryService');

exports.getTelemetryData = (req, res) => {
  const data = telemetryService.getTelemetryData();
  res.json(data);
};
