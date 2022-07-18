import http from 'node:http'
import handler from './handler'

class ApiServer {
    private server: any;

    constructor(){
        this.server = http.createServer(handler)
    }

    public Start = (port: any) =>{
        return this.server.listen(port,  ()=>console.log(`server is running on port ${PORT}`))
    }
}

const PORT = process.env.PORT || 3000
const server = new ApiServer().Start(PORT)

export default ApiServer;
