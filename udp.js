import dgram from 'dgram';

const portNumber = parseInt(process.argv[2]) || 8080;
const host = '127.0.0.1'; // Specify the IPv4 loopback address

// Create the UDP server
const server = dgram.createSocket('udp4');

// This event is emitted when a new datagram is received
server.on('message', (message, rinfo) => {
  console.log(`Received data from client: ${message.toString()} from ${rinfo.address}:${rinfo.port}`);

  // Example of sending a response to the client after receiving a message
  const response = Buffer.from(`Server echoing: ${message}`);
  server.send(response, 0, response.length, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error('Error sending response:', err);
    }
  });
});

// This event is emitted when the socket starts listening for datagrams
server.on('listening', () => {
  const address = server.address();
  console.log(`Meaningless process running on ${address.address}:${address.port}. Press Ctrl + C to stop.`);
});

// Bind the UDP server to the specified port and IPv4 loopback address
server.bind(portNumber, host);

// Handle SIGINT signal to gracefully close the server
process.on('SIGINT', () => {
  console.log('\nSIGINT signal received. Closing the server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});