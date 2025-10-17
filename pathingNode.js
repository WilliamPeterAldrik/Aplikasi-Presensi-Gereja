const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const d = url.parse(req.url, true)
    let fileLocation
    switch (d.pathname) {
        case '/':   
            fileLocation = 'index.html'
            break
        }
})
server.listen(8888, () => {
    console.log("Server run at port 8888")
})