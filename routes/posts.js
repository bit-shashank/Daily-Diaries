const express = require("express");
const route = express.Router();

const Post = require("../models/Post");

route.get("/add", (req, res) => {
	res.render("post.ejs");
});

route.post("/add", (req, res) => {
	//Getting the logged in user
	console.log(req.body);
});

module.exports = route;
