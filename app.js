const http = require("http");
const path = require("path");
const fs = require("fs");

const serveFile = function (error, buffer, res) {

    let bufferMessage;
    let statusCode;

    if (error) {
        bufferMessage = "file not found";
        statusCode = 404;
    } else {
        bufferMessage = buffer;
        statusCode = 200;
    }

    res.setHeader("Content-type", "text/html");
    res.writeHeader(statusCode);
    res.end(bufferMessage);
}

const serverRooting = function (req, res) {
    switch (req.method) {
        case "POST": {
            res.setHeader("Content-type", "application/json");
            res.writeHeader(200);
            res.end("{'messege': 'this is a post request'}");
            break;
        }
        case "GET": {
            switch (req.url) {
                case "/": {
                    fs.readFile(path.join(__dirname, "\index.html"), function (err, buffer) {
                        serveFile(err, buffer, res);
                    });
                    break;
                }
                case "/page1.html": {
                    fs.readFile(path.join(__dirname, "\page1.html"), function (err, buffer) {
                        serveFile(err, buffer, res);
                    });
                    break;
                }
                case "/page2.html": {
                    fs.readFile(path.join(__dirname, "\page2.html"), function (err, buffer) {
                        serveFile(err, buffer, res);
                    });
                    break;
                }

            }
            break;
        }
    }
}
const server = http.createServer(serverRooting);
server.listen(8383, "localhost", function(){
    console.log("Server is running on port 8383")
})