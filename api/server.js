const http = require('http');
const app = require('./src/app');
const config = require('./config/config')

const server = http.createServer(app);
server.listen(config.PORT)
