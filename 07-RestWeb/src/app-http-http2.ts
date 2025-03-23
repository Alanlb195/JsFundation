
// import http from 'http';
import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {


    // !test
    // console.log(req.url);
    // res.write('Hola mundo');
    // res.end();

    // !test
    // res.writeHead(200, { 'content-type': 'text/html' });
    // res.write(`<h1>URL: ${req.url}`);
    // res.end();


    // !test
    // const data = { name: 'Alan Lopez', age: 26, city: 'Cancun'};
    // res.writeHead(200, { 'content-type': 'application/json' });
    // res.end(JSON.stringify(data));


    // !Create html response, including css and js files.
    // if (req.url === '/') {
    //     const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    //     res.writeHead(200, { 'content-type': 'text/html' });
    //     res.end(htmlFile);
    //     return;
    // }

    // if (req.url?.endsWith('.js')) {
    //     res.writeHead(200, { 'content-type': 'application/javascript' });
    // } else if (req.url?.endsWith('.css')) {
    //     res.writeHead(200, { 'content-type': 'text/css' });
    // }


    // try {
    //     const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    //     res.end(responseContent);
    // } catch (error) {
    //     res.writeHead(404, { 'content-type': 'text/html' });
    //     res.end();
    // }

});



server.listen(8080, () => {
    console.log('Server running on port 8080');
});


