import { IncomingMessage, RequestListener, ServerResponse } from "node:http";
import { dirname, join } from "node:path";
import { parse, fileURLToPath } from "node:url";
import { IBook } from "./entities/book";
import { generateInstance } from "./factories/bookFactory";
import { routes } from "./routes/bookRoute";
import { typeRoutes } from "./routes/iRoutes";
import { DEFAULT_HEADER } from "./util/util";
const currentDir = dirname(fileURLToPath(`file://${process.cwd()}/database`))

const filePath = join(currentDir, 'database', 'data.json')

console.log(filePath)

const bookService = generateInstance(filePath)

const bookRoutes = routes(bookService)

const allRoutes: typeRoutes = {
  ...bookRoutes,

  default: (request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(404, DEFAULT_HEADER);
    response.write("(404) not found.");
    response.end();
  },
};

function handlerError(response: ServerResponse) {
  //TODO: replace any
  return (error: any) => {
    console.log("Someting bad happened", error.stack);
  };
}

function handler(request: IncomingMessage, response: ServerResponse) {
  const { url = "", method = "" } = request;

  const { pathname } = parse(url, true);

  const key = `${pathname}:${method.toLowerCase()}`;
  const currentRoute = allRoutes[key] || allRoutes.default;

  return Promise.resolve(currentRoute(request, response))
    .catch(handlerError(response)
  );
}

export default handler;

