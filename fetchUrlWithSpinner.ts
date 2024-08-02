import { TerminalSpinner } from "https://deno.land/x/spinners/mod.ts";

const terminalSpinner = new TerminalSpinner("URL Check");

const urlText = Deno.args[0];
if (!urlText) {
  console.error("Need arg", Deno.args);
  Deno.exit(1);
}
const targetUrl = new URL(urlText);

terminalSpinner.start();

const res = await fetch(targetUrl, {
  headers: {
  },
});

terminalSpinner.succeed();

console.info("\n\nStatus:\n")
console.info(res.statusText);
console.info("\n\nBody:\n")
console.info((await res.text()).slice(0, 150));

