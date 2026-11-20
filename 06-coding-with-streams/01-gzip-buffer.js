import { readFile, writeFile } from "node:fs/promises";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

const gzipPromise = promisify(gzip);

const data = await readFile("./01-input.txt");
const gzippedData = await gzipPromise(data);
await writeFile("./01-output.txt.gz", gzippedData);
console.log("done");
