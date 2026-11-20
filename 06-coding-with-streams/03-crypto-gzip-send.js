import { createReadStream } from "node:fs";
import { createCipheriv, randomBytes } from "node:crypto";
import { createGzip } from "node:zlib";
import { request } from "node:http";

const filename = "./03-input.txt";
const secret = Buffer.from("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "hex");
const iv = randomBytes(16);

const req = request({
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "POST",
  headers: {
    "content-type": "application/octet-stream",
    "content-encoding": "gzip",
    "x-iv": iv.toString("hex"),
  },
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createCipheriv("aes192", secret, iv))
  .pipe(req)
  .on("finish", () => {
    console.log("done");
  });
