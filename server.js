require("dotenv").config();
const http = require("http");

//Express Server
const app = require("./backend/app");
app.set("port", process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.info(
    `App is running on: http://localhost: ${process.env.PORT || 3000}`
  );
});
