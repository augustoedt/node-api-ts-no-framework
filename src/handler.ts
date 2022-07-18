import { IncomingMessage, RequestListener, ServerResponse } from "node:http";
import { parse } from "node:url";
// import { DEFAULT_HEADER } from "./util/util";

const allRoutes: typeRoutes = {
  "/books:get": (request: IncomingMessage, response: ServerResponse) => {
    response.write("GET");
    response.end();
  },

  default: (request: IncomingMessage, response: ServerResponse) => {
    // response.write(404, {'content-type': 'application/json'});
    // response.write(DEFAULT_HEADER);
    response.write("(404) not found.");
    response.end();
  },
};

function handler(request: IncomingMessage, response: ServerResponse) {
  const { url = "", method = "" } = request;

  const { pathname } = parse(url, true);

  const key = `${pathname}:${method.toLowerCase()}`;
  const currentRoute = allRoutes[key] || allRoutes.default;

  return currentRoute(request, response);
}

export default handler;

//**** Types ****//

type typeRoutes = {[key : symbol | string]: RequestListener};