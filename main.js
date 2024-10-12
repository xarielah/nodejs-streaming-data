const http = require("http");
const server = http.createServer();
const fs = require('fs');

// Listen to incoming requests.
server.on("request", (req, res) => {
    if (req.method === "GET" && req.url === "/") {
        fs.createReadStream(__dirname + "/static/index.html").pipe(res);
    } else if (req.method === "GET" && req.url === "/api/data") {
        // Set header as text.
        res.writeHead(200, "ok", { "Content-Type": "text/plain" })
        // Start on writing the response to the client.

        fs.createReadStream(__dirname + "/static/lorem.txt", {
            highWaterMark: 1,
            encoding: "utf-8"
        }).pipe(res);
    } else {
        // Redirect any other type of requests to home.
        res.writeHead(304, { location: "/" })
        return res.end();
    }
})

// function writeData(res, data) {
//     return new Promise((resolve) => {
//         let t = 1;
//         const i = setInterval(() => {
//             // Have the type-writer effect when you write each letter individually.
//             res.write(data.charAt(t));
//             t++;
//             if (t === lorem.length - 1) {
//                 clearInterval(i);
//                 resolve();
//             }
//         }, 5);
//     });
// }

server.listen(process.env.PORT || 6969, function () {
    console.log("Server is RUNNING...");
})


// IIFE = Immedietly invoked function expression
