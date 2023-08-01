import net from 'net';

const portNumber = process.argv[2] || 8080;
const host = '127.0.0.1'; // Specify the IPv4 loopback address

// Create the TCP server
const server = net.createServer({ host }, (socket) => {
  // This function is called whenever a new client connects to the server
  console.log(`New client connected from ${socket.remoteAddress}:${socket.remotePort}`);

  // You can write any logic here to process the client's data or send data to the client.
  // For a meaningless process, you might just log some messages or do nothing.

  // Example of echoing the client's data back to the client:
  socket.on('data', (data) => {
    console.log(`Received data from client: ${data}`);
    socket.write(`Server echoing: ${data}`);
  });

  // Example of sending a message to the client after a connection is established:
  socket.write('Welcome to the meaningless server!\r\n');
});

// Start listening on the specified port and IPv4 loopback address
server.listen(portNumber, host, () => {
  console.log(`Meaningless process running on ${host}:${portNumber}. Press Ctrl + C to stop.`);
});

// Handle SIGINT signal to gracefully close the server
process.on('SIGINT', () => {
  console.log('\nSIGINT signal received. Closing the server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
