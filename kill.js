// kill.js
import fkill from 'fkill';

// Read the port number from the command-line arguments (third argument in the array)
const portNumber = process.argv[2];

if (!portNumber) {
  console.error('Error: Please provide a port number to kill the process on.');
  process.exit(1);
}

// Function to kill a process on a given port
async function killProcessOnPort(port) {
  try {
    await fkill(`:${port}`, { force: true });
    console.log(`Process running on port ${port} has been terminated.`);
  } catch (err) {
    console.error(`Error terminating process on port ${port}: ${err.message}`);
  }
}

killProcessOnPort(portNumber);
