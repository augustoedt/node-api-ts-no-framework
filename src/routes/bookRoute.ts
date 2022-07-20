import { once } from "node:events";
import { IncomingMessage, ServerResponse } from "node:http";
import { Book} from "../entities/book";
import { DEFAULT_HEADER } from "../util/util";

const routes = () => ({
  "/books:get": async (request: IncomingMessage, response: ServerResponse) => {
    response.write("GET");
    response.end();
  },
  "/books:post": async (request: IncomingMessage, response: ServerResponse) => {
    const data = await once(request, 'data');
    const stringData = Buffer.concat(data).toString()
    const item = JSON.parse(stringData);
    const book = new Book(item);
    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify({
        success: 'User created with success',
        id: book.id
    }))
    response.end();
  },
});

export { routes };
