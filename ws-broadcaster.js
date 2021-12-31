const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();

wss.on('connection', ws => {
  clients.add(ws);

  ws.on('message', message => {
    console.log(`Received message => ${message}`);

    // Send to every other client
    for (let client of clients) {
      if (client != ws) {
        client.send(message);
      }
    }
  });

  ws.on("close", () => {
      clients.delete(ws);
  });

})