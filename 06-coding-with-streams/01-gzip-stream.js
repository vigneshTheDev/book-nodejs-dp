import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";

const fileName = "./01-input.txt";

createReadStream(fileName)
  .pipe(createGzip())
  .pipe(createWriteStream("./01-output2.txt.gz"))
  .on("finish", () => console.log("Done"));
