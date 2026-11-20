import { createServer } from "node:http";
import { createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { createDecipheriv } from "node:crypto";

const secret = Buffer.from("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "hex");

const server = createServer((req, res) => {
  console.time("req");
  const iv = Buffer.from(req.headers["x-iv"], "hex");
  req
    .pipe(createDecipheriv("aes192", secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream("./03-output.txt"))
    .on("finish", () => {
      res.writeHead(201, { "content-type": "text/plain" });
      res.end("OK\n");
      console.timeEnd("req");
      console.log("File saved");
    });
});

server.listen(3000, () => console.log("listening on http://localhost:3000"));
