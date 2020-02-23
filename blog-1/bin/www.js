const http = require('http')
const serverHadle = require('../app')

const PORT = 3000
const server = http.createServer(serverHadle)
server.listen(3000)