import { rejects } from 'node:assert';
import http from 'node:http'
import { resolve } from 'node:path';
import handler from './handler'


// const server = http.createServer(handler).listen(PORT, ()=>console.log(`server is running on port ${PORT}`))

class ApiServer {
    private server: any;

    constructor(){
        this.server = http.createServer(handler)
    }

    public Start = (port: any) =>{
        return new Promise((resolve, rejects)=>{
            this.server.listen(port,  ()=>console.log(`server is running on port ${PORT}`))
        })
    }
}

const PORT = process.env.PORT || 3000
const server = new ApiServer().Start(PORT)

export default ApiServer;
