import { v4 } from "https://deno.land/std@0.95.0/uuid/mod.ts";

const inputUuid = Deno.args[0];

// Validate a v4 uuid.
const isValid = v4.validate(inputUuid);
if (isValid) {
  console.log(inputUuid.replace(/-/g, ""));
  Deno.exit(0);
} else {
  console.log(inputUuid, isValid);
  Deno.exit(1);
}
