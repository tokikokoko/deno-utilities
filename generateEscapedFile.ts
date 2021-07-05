const filePath = Deno.args[0];;
const file = await Deno.open(filePath);
const decoder = new TextDecoder('utf-8');
const text = decoder.decode(await Deno.readAll(file));
const json = {
    "encoded": text
};
console.log(JSON.stringify(json));