const http = require('http');
const fs = require('fs');
const path = require('path');

// The port the server will listen on
const PORT = 3000;
// The base directory for all static files
const PUBLIC_DIR = path.join(__dirname, 'public');

// Simple map for common file extensions and their MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

/**
 * Creates a simple HTTP server instance that serves files from the 'public' directory.
 */
const server = http.createServer((req, res) => {
    // 1. Determine the file path
    let requestPath = req.url === '/' ? 'index.html' : req.url;
    
    // Clean up the request path by removing the leading slash if present
    if (requestPath.startsWith('/')) {
        requestPath = requestPath.substring(1);
    }
    
    // Crucial: The uploaded files use special names in the HTML (e.g., 'uploaded:...'). 
    // We must map these to actual file names or handle them as needed for local serving.
    // For local hosting, you must ensure the requested path corresponds to a file name in your public folder.
    
    // We look for the file in the public directory
    const filePath = path.join(PUBLIC_DIR, requestPath);
    
    // 2. Check if the file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // File not found (404)
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found: ' + req.url);
            return;
        }

        // 3. Get MIME type
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        // 4. Read and serve the file
        fs.readFile(filePath, (error, data) => {
            if (error) {
                // Server error reading file (500)
                console.error('Error reading file:', error.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                return;
            }

            // Success (200)
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

/**
 * Starts the server and listens on the specified port.
 */
server.listen(PORT, () => {
    console.log(`Node.js static file server running successfully!`);
    console.log(`Serving files from the '${path.basename(PUBLIC_DIR)}' directory.`);
    console.log(`Your portfolio is available at: http://localhost:${PORT}/`);
});