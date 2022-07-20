import { once } from "node:events";
import { IncomingMessage, ServerResponse } from "node:http";
import { Book } from "../entities/book";
import BookService from "../services/bookService";
import { DEFAULT_HEADER } from "../util/util";

const routes = (bookService : BookService) => ({
  "/books:get": async (request: IncomingMessage, response: ServerResponse) => {
    response.write("GET");
    response.end();
  },
  "/books:post": async (request: IncomingMessage, response: ServerResponse) => {

    const data = await once(request, "data");
    const item = JSON.parse(Buffer.concat(data).toString());
    const book = new Book(item);

    const id = await bookService.create(book)

    response.writeHead(201, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        success: "User created with success",
        id: book.id,
      })
    );
    response.end();
  },
});
export { routes };
