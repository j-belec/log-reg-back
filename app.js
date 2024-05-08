const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const port = 3100;

//IN ORDER TO USE POST HTTP METHOD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//SESSION
app.use(
  session({
    secret: "mi-secreto-super-seguro", // Clave secreta para firmar el ID de la sesión
    resave: true, // Don't save session data if nothing has changed
    saveUninitialized: false, // Save a session even if it's new, but we haven't modified it yet
  })
);

//ROUTES
const usersRoutes = require("./src/routes/userRoutes");
app.use("/users", usersRoutes);

//SERVER
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
