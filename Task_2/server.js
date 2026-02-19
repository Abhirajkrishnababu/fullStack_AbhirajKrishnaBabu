const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;
const FILE = 'notes.txt';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Route 1: Add Note
    if (pathname === '/add') {
        const note = query.note;

        if (!note) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('400 Bad Request - Note parameter is missing');
            return;
        }

        fs.appendFile(FILE, note + '\n', (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Error saving note');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Note Added Successfully');
        });
    }

    // Route 2: View Notes
    else if (pathname === '/notes') {
        fs.readFile(FILE, 'utf8', (err, data) => {
            if (err || !data.trim()) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('No Notes Found');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }

    // Route 3: Clear Notes
    else if (pathname === '/clear') {
        fs.writeFile(FILE, '', (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Error clearing notes');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('All Notes Deleted');
        });
    }

    // Default Route
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

