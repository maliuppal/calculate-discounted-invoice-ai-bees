import debug from 'debug';
import http from 'http';
import app from './config/express';
import './common/exceptions';

/**
 * Get port from environment and store in Express.
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || 8000);
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.log(`Port ${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(`Port ${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Server is up on port: ${port}`));


server.on('error', onError);
server.on('listening', onListening);