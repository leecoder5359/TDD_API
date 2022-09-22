// const math = require("./math");
//
// const result = math.sum(1,2);
//
// console.log(result) // 3
//
//
// const fs = require("fs");
//
// const data = fs.readFileSync('./data.txt', 'utf-8');
//
// console.log(data);
//
// const read_file_data = fs.readFile('./data.txt', 'utf-8', (err, data) => {
//     console.log(data);
// })


const http = require("http");

const hostname = '127.0.0.1'; //
const port = 4534; //

const server = http.createServer((req, res) => {

    if(req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('VTPL');
    }else if(req.url === '/users'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('users');
    }else{
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
