import { IncomingMessage, RequestListener, ServerResponse } from "node:http";
import { dirname, join } from "node:path";
import { parse, fileURLToPath, ur } from "node:url";
import { generateInstance } from "./factories/bookFactory";
import { routes } from "./routes/bookRoute";
import { DEFAULT_HEADER } from "./util/util";

const currentDir = dirname(fileURLToPath())

const heroService = generateInstance(filePath)

const bookRoutes = routes()

const allRoutes: typeRoutes = {
  ...bookRoutes,

  default: (request: IncomingMessage, response: ServerResponse) => {
    // response.write(404, {'content-type': 'application/json'});
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

//**** Types ****//

type typeRoutes = { [key: symbol | string]: RequestListener };
