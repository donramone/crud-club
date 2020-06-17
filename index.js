const app = require("./app");


async function main(){
    await app.listen(app.get("port"));
    console.log("server on port is ", app.get("port"));
}

main();