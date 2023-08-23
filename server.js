const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const NodeClam = require('clamscan');
const ClamScan = new NodeClam().init({
    debugMode: true,
    scanRecursively: false,
    clamscan: {
        active: false,
    },
    clamdscan: {
        host: "clamav-service-vs.rhm-consumption-management.svc.cluster.local",
        port: 3310,
    },
});

// See: http://expressjs.com/en/4x/api.html#app.settings.table
const PRODUCTION = app.get('env') === 'production';

// Administrative routes are not timed or logged, but for non-admin routes, pino
// overhead is included in timing.
app.get('/ready', (req, res) => res.status(200).json({ status: "ok" }));
app.get('/live', (req, res) => res.status(200).json({ status: "ok" }));

app.get('/', async (req, res) => {
    const readStream = new stream.Readable();
    readStream.push('test');
    readStream.push(null);
    const result = await clamscan.scanStream(readStream);
    // Use req.log (a `pino` instance) to log JSON:
    res.send(`Hello from Node.js Starter Application! ${JSON.stringify(result)}`);
});

app.get('*', (req, res) => {
    res.status(404).send("Not Found");
});

// Listen and serve.
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`App started on PORT ${PORT}`);
});