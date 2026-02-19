const http = require('http');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'requests.log');

// ✅ Create log file if it doesn't exist
if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, '--- Server Log Started ---\n');
}

// Create server
const server = http.createServer((req, res) => {

    const { url, method } = req;

    const time = new Date().toISOString();

    const logEntry = `Route: ${url} | Method: ${method} | Time: ${time}\n`;

    // Append log (never overwrite)
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error("Log write error:", err);
    });

    // Routes
    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Home Page');
    }

    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');
    }

    else if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Contact Page');
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
