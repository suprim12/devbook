const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const passport = require("passport");
// Db Config
const db = require("./config/keys").mongoURI;
// Passport Config
require("./config/passport.js")(passport);
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.Router());
app.use(passport.initialize());
// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);
// Connect to db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`Connected to db`))
  .catch(err => console.error(`Connection Error ${err}`));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at port ${port}`));
