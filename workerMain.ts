import { delay } from "https://deno.land/std/async/mod.ts";

const WORKER_COUNT = 10;
const workers = [...Array(WORKER_COUNT)].map((_, i) => {
  return new Worker(new URL("./workerSub.ts", import.meta.url).href, {
    type: "module",
  });
});

const q = [...Array(103)].map((_, i) => `queue${i}`);
let completedWorkers = [];

workers.forEach((w) => {
  w.addEventListener("message", async (msg) => {
    if (msg.data.message === "complete" && q.length > 0) {
      const nextMsg = q.pop();
      w.postMessage({ message: nextMsg, complete: false });
      return;
    }
    if (msg.data.message === "close") {
      completedWorkers.push(true);
      return;
    }
  });
});

workers.forEach((w) => {
  const nextMsg = q.pop();
  w.postMessage({ message: nextMsg, complete: false });
});

// Wait workers
while (q.length > 0) {
  await delay(1 * 1000);
}

console.info("Empty queue.");

// Close workers
workers.forEach((w) => {
  w.postMessage({ complete: true });
});

while (completedWorkers.length < WORKER_COUNT) {
  await delay(1 * 1000);
}

console.info("Job complete.");
