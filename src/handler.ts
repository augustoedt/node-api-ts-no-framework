import { IncomingMessage, RequestListener, ServerResponse } from "node:http";
import { parse } from "node:url";
import { DEFAULT_HEADER } from "./util/util";

const allRoutes: typeRoutes = {
  "/books:get": (request: IncomingMessage, response: ServerResponse) => {
    response.write("GET");
    response.end();
  },

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
