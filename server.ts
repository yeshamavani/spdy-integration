import * as fs from "fs";
import path from "path";
import spdy from "spdy";
import { NormalLoopbackApplication as App } from "./normal-loopback/src/application";

const __dirname = path.resolve();

var options = {
  key: fs.readFileSync(
    path.join(__dirname, "cert-files", "localhost-privkey.pem")
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "cert-files", "localhost-cert.pem")
  ),
};

let lbApp = new App({});
lbApp.projectRoot = path.join(__dirname, "normal-loopback", "dist");

async function createHttp2Server() {
  //create http2 server using spdy
  const server = spdy.createServer(options);

  lbApp.boot().then(() => {
    server.on("request", (req, res) => {});
  });

  // var server = spdy.createServer(options, function (req, res) {
  //   res.writeHead(200, { "content-type": "text/html" });
  //   var message = "No SPDY for you!";
  //   if (req.isSpdy) {
  //     message = "YAY! SPDY Works!";
  //   }
  //   res.end(
  //     "" +
  //       "<html>" +
  //       "<head>" +
  //       "<title>First SPDY App!</title>" +
  //       "<script src='/underscore.js'></script>" +
  //       "<script src='/backbone.js'></script>" +
  //       "<script src='/application.js'></script>" +
  //       "<head>" +
  //       "<body>" +
  //       "<h1>" +
  //       message +
  //       "</h1>" +
  //       "</body>" +
  //       "<html>"
  //   );
  // });

  server.listen(3000);
}

createHttp2Server();
