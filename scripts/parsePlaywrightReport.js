const fs = require('fs');
const path = require('path');
const express = require('express');
const client = require('prom-client');

// Path to your Playwright JSON report
const reportPath = path.join(__dirname, '../playwright-report.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

let passed = 0;
let failed = 0;
let skipped = 0;
let totalDuration = 0;
let testCount = 0;

report.suites.forEach(suite => {
  suite.specs.forEach(spec => {
    spec.tests.forEach(test => {
      test.results.forEach(result => {
        testCount++;
        totalDuration += result.duration || 0;
        if (result.status === 'passed') passed++;
        else if (result.status === 'failed') failed++;
        else if (result.status === 'skipped') skipped++;
      });
    });
  });
});

// Prometheus metrics
const passedGauge = new client.Gauge({ name: 'playwright_tests_passed', help: 'Number of passed Playwright tests' });
const failedGauge = new client.Gauge({ name: 'playwright_tests_failed', help: 'Number of failed Playwright tests' });
const skippedGauge = new client.Gauge({ name: 'playwright_tests_skipped', help: 'Number of skipped Playwright tests' });
const durationGauge = new client.Gauge({ name: 'playwright_tests_total_duration_ms', help: 'Total duration of Playwright tests in ms' });
const avgDurationGauge = new client.Gauge({ name: 'playwright_tests_avg_duration_ms', help: 'Average duration of Playwright tests in ms' });

passedGauge.set(passed);
failedGauge.set(failed);
skippedGauge.set(skipped);
durationGauge.set(totalDuration);
avgDurationGauge.set(testCount ? totalDuration / testCount : 0);

// Expose metrics via HTTP
const app = express();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const port = 3000;
app.listen(port, () => {
  console.log(`Prometheus metrics available at http://localhost:${port}/metrics`);
});