// Create web server
// 1. Create a new web server
// 2. Listen for requests
// 3. Parse the request
// 4. Read the file
// 5. Respond with the file

// 1. Create a new web server
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    // 3. Parse the request
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    // 4. Read the file
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    } else if (pathName === '/api') {
        fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err, data) => {
            const productData = JSON.parse(data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>Page not found</h1>');
    }
});

