if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const indexRoute = require("./routes/index");
const flash = require("connect-flash");
const session = require("express-session");

mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to Databse"))
	.catch((err) => console.log("Connection to database failed. Error: " + err));

app.use(express.static(path.join(__dirname, "public")));
app.set("view-engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRoute);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.listen(process.env.PORT || 80);
