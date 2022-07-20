import http, { Server } from "node:http";
import handler from "./handler";

class ApiServer {
  private _server: Server;

  constructor() {
    this._server = http.createServer(handler);
  }

  public Start = (port: string | number) => {
    return this._server.listen(port, () =>
      console.log(`server is running on port ${port}`)
    );
  };
}

export default ApiServer;
