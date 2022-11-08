const express = require("express");
const app = express();

// cors
const cors = require("cors");
app.use(cors());

// json
app.use(express.json());

// dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// port
const port = process.env.PORT || 3001;

// database
require("./database/connection");

// route
app.use(require("./routes/route"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/frontend/build"))
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
