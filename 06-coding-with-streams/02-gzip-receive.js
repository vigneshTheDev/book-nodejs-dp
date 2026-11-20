import { createServer } from "node:http";
import { createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";

const server = createServer((req, res) => {
  console.time('req')
  req
    .pipe(createGunzip())
    .pipe(createWriteStream("./02-output.txt"))
    .on("finish", () => {
      res.writeHead(201, { "content-type": "text/plain" });
      res.end("OK\n");
      console.timeEnd('req')
      console.log("File saved");
    });
});

server.listen(3000, () => console.log("listening on http://localhost:3000"));
