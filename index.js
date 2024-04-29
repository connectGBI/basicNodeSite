const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url + '.html');
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error occurred');
                    return;
                }
                res.writeHead(404);
                res.end(content);
            });
            return;
        }
        res.writeHead(200);
        res.end(content);
    });
    
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
