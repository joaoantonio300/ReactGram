require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
// in truly i am saing here that i can send ou receive informations by this local cuz the credentials are true
// other thing is the origin where i can set
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Upload directory
// static is a middleware, everything into this path can be acess by browser, cuz we did turn that on a public path
app.use("/uploads", express.static(path.join(__dirname, "uploads/")));

// DB connections
require("./config/db.js")

// routes
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
