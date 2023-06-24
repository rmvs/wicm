import app from "./_app";
import debug from 'debug'
import http from 'http' 
import { AddressInfo } from 'net'
const port = process.env.PORT || 3000
app.set('PORT',port)

const _debug = debug('wicm:server')
const server = http.createServer(app)

server.listen(port,() => {
    const addr = server.address() as AddressInfo
    _debug(`Server listening on http://${addr.port}:${addr.port}`)
})

server.on('error',(err: Error) => {
    console.log(`Ocorreu um erro ao iniciar o servidor: ${err}`)    
})