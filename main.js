const http = require("http");
const server = http.createServer();
const fs = require('fs');

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
Praesentium cumque eos optio, corrupti voluptates in quo quia. Autem, eveniet, voluptatibus veniam consequatur illum iusto.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin. 
Suspendisse in justo eu magna luctus suscipit. Sed lectus. Aenean laoreet. Vestibulum nisi lectus, commodo ac est eget, luctus tincidunt metus. 
In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. 
Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. 
Sed posuere consectetur est at lobortis. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. 
Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
`;

// Cache page in memory so we don't read it on any request.
const htmlPage = fs.readFileSync(__dirname + "/static/index.html");

// Listen to incoming requests.
server.on("request", (req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.write(htmlPage);
        return res.end();
    }
    else if (req.method === "GET" && req.url === "/api/data") {
        // Set header as text.
        res.writeHead(200, "ok", { "Content-Type": "text/html" })
        // Start on writing the response to the client.
        writeData(res, lorem)
            // End it whenever, success or fail.
            .finally(() => res.end());
    } else {
        // Redirect any other type of requests to home.
        res.writeHead(304, { location: "/" })
        return res.end();
    }
})

function writeData(res, data) {
    return new Promise((resolve) => {
        let t = 1;
        const i = setInterval(() => {
            // Have the type-writer effect when you write each letter individually.
            res.write(data.substring(t, t + 1));
            t++;
            if (t === lorem.length - 1) {
                clearInterval(i);
                resolve();
            }
        }, 5);

    });
}

server.listen(6969, function () {
    console.log("Server is RUNNING...");
})