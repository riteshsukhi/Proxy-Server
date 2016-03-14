"use strict";
let http = require('http')
// All require calls go at the top of index.js
let request = require('request')
// Place near the top of your file, just below your other requires 
// Set a the default value for --host to 127.0.0.1
let argv = require('yargs')
    .default('host', '127.0.0.1:8000')
    .argv
let scheme = 'http://'
// Get the --port value
// If none, default to the echo server port, or 80 if --host exists
let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80)

// Update our destinationUrl line from above to include the port
let destinationUrl = argv.url ||scheme  + argv.host + ':' + port
if(req.headers['x-destination-url']){
  destinationUrl = req.headers['x-destination-url']
}

let path = require('path')
let fs = require('fs')
let logPath = argv.log && path.join(__dirname, argv.log)
let getLogStream = ()=> logPath ? fs.createWriteStream(logPath) : process.stdout


http.createServer((req, res) => {
  console.log(`Proxying request to: ${destinationUrl + req.url}`)
 // Log the req headers and content in the **server callback**
process.stdout.write('\n\n\n' + JSON.stringify(req.headers))
let logPath = argv.log && path.join(__dirname, argv.log)
let logStream = logPath ? fs.createWriteStream(logPath) : process.stdout
//...
req.pipe(logStream, {end: false})
// Log the proxy request headers and content in the **server callback**
let downstreamResponse = req.pipe(request(options))
process.stdout.write(JSON.stringify(downstreamResponse.headers))
downstreamResponse.pipe(process.stdout)
downstreamResponse.pipe(res)
  // Proxy code here
  let options = {
        headers: req.headers,
        url: `http://${destinationUrl}${req.url}`
    }
    options.method = req.method
// Notice streams are chainable:
// inpuStream -> input/outputStream -> outputStream
req.pipe(request(options)).pipe(res)
}).listen(8001)


http.createServer((req, res) => {
    console.log(`Request received at: ${req.url}`)
    for (let header in req.headers) {
    res.setHeader(header, req.headers[header])
    }
    req.pipe(res)
}).listen(8000)


