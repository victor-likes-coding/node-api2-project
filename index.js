// require your server and launch it here
const server = require("./api/server.js");

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log("\n* Server Running on http://localhost:4000 *\n");
});
