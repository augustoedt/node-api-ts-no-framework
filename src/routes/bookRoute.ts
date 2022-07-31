import { once } from "node:events";
import { IncomingMessage, ServerResponse } from "node:http";
import { Book, BookData } from "../entities/book";
import BookService from "../services/bookService";
import { DEFAULT_HEADER } from "../util/util";
import { IRoute } from "./iRoutes";

const routes = (bookService : BookService) => ({
  "/books:get": async (request: IncomingMessage, response: ServerResponse) => {

    const books = await bookService.find()

    response.write(JSON.stringify({
      results: books
    }));
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

  "/book:post": async (request: IncomingMessage, response: ServerResponse) => {

    const data = Buffer.concat(await once(request, "data")).toString();
    const item : BookData = JSON.parse(data);

    const bookId = await bookService.update(item)

    response.writeHead(201, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        success: "Book updates with success",
        id: bookId
      })
    );
    response.end()
  },
});
export { routes };

class BookRoute extends IRoute< Book, BookData >{
  constructor(path : string, req : IncomingMessage, res: ServerResponse){
    super(path,req, res)
  }
}

