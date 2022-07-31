import { once } from "node:events";
import { IncomingMessage, RequestListener, ServerResponse } from "node:http";

type typeRoutes = { [key: symbol | string]: RequestListener };

abstract class IRoute<Type, IType>{
    path: string;
    req: IncomingMessage;
    res: ServerResponse;
    data?: string;
    item?: IType;
    itemObject?:Type

    constructor(path: string, req : IncomingMessage, res : ServerResponse){
        this.path = path
        this.req = req
        this.res = res
    }

    async getData() : Promise<void> {
        const data = Buffer.concat(await once(this.req, "data")).toString();
        this.data = data;
    }

}

export {
    typeRoutes,
    IRoute
}
