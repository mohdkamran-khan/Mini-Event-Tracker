require("dotenv").config({
  path: ".env",
});
require("colors");
const app = require("./src/app");
const { ConnectDB } = require("./src/db.config");
const port = process.env.PORT || 8000;

ConnectDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`.bgBlue);
});
