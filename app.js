const express = require("express");

const path = require("path")
const Myrouter = require("./route/route.js");
const auth = require("./Middleware/authMiddleware");
const allowRoles = require("./Middleware/roleMiddleware");

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");

app.use(
  session({
    secret: "gereja-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    }
  })
);

// API
app.use("/api/users", require("./route/userRoute"));
app.use("/api/roles", require("./route/roleRoute"));

// WEB
app.use(Myrouter);

// PUBLIC (BELUM LOGIN)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "ga_ada_akun", "home.html"));
});


app.listen(port, () => console.log(`Running at http://localhost:${port}`));
