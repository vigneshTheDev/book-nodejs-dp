import { createReadStream } from "node:fs";
import { createGzip } from "node:zlib";
import {request} from 'node:http'


const filename = "./02-input.txt";

const req = request({
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "POST",
  headers: {
    "content-type": "application/octet-stream",
    "content-encoding": "gzip",
  },
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(req)
  .on("finish", () => {
    console.log("done");
  });
