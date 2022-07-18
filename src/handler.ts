import { IncomingMessage, ServerResponse } from "node:http";
import { parse } from "node:url";
function handler(request: IncomingMessage, response: ServerResponse) {
  const { url = "", method } = request;

  const { pathname } = parse(url, true)
  console.log({ url, method });
  response.end("");
}

export default handler;
