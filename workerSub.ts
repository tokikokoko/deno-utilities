import { delay } from "https://deno.land/std/async/mod.ts";

self.onmessage = async (msg) => {
  if (msg.data.complete) {
    console.info("Worker close.");
    self.postMessage({ message: "close" });
    self.close();
  }

  console.log(msg.data);
  await delay(1 * 1000);
  self.postMessage({ message: "complete" });
};
