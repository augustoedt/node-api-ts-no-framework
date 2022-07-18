import http from 'node:http'
import handler from './handler'

const PORT = process.env.PORT || 3000

const server = http.createServer(handler).listen(PORT, ()=>console.log(`server is running on port ${PORT}`))


export {
    server
}
