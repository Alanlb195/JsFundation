import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString()
    })
    // ws.send(JSON.stringify(payload));

    
    //* Everyone recives the message:
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });

    //* Everyone except emisor recives the message:
    // wss.clients.forEach(function each(client) {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });
  });


  ws.on('close', () => {
    console.log('Client disconnected')
  });


  // setInterval(() => {
  //   ws.send('Hola de nuevo desde el servidor');
  // }, 2000);

});


console.log('ws://localhost:3000');