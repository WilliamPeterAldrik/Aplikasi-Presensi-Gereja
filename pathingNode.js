const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const d = url.parse(req.url, true)
    let fileLocation
    switch (d.pathname) {
        case '/':   
            fileLocation = 'pages/home.html'
            break
        case '/about':
            fileLocation = 'pages/about.html'
            break
        case '/absen':
            fileLocation = 'pages/absen.html'
            break
        default:
            fileLocation = 'pages/home.html'
        }
})
