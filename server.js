const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)

// See: http://expressjs.com/en/4x/api.html#app.settings.table
const PRODUCTION = app.get('env') === 'production';

// Administrative routes are not timed or logged, but for non-admin routes, pino
// overhead is included in timing.
app.get('/ready', (req, res) => res.status(200).json({ status: "ok" }));
app.get('/live', (req, res) => res.status(200).json({ status: "ok" }));

app.get('/', (req, res) => {
    // Use req.log (a `pino` instance) to log JSON:
    res.send('Hello from Node.js Starter Application!');
});

app.get('*', (req, res) => {
    res.status(404).send("Not Found");
});

// Listen and serve.
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`App started on PORT ${PORT}`);
});