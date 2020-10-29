const express = require("express");
const route = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

route.get("/login", (req, res) => {
	res.render("login.ejs");
});

route.get("/register", (req, res) => {
	res.render("register.ejs", { name: "", password: "", confirmPassword: "" });
});

route.post("/login", (req, res) => {
	console.log(req.body);
});

route.post("/register", (req, res) => {
	const { name, password, confirmPassword } = req.body;
	let errors = [];

	//What if all the fields are not filled
	if (!name || !password || !confirmPassword) errors.push({ msg: "All fields are required." });

	//What if passwords don't match
	if (password !== confirmPassword) errors.push({ msg: "Passwords don't match" });

	//What if passwords length is not greater than 8
	if (password.length < 8)
		errors.push({ msg: "Password length should be at least 8 characters" });

	//What if user already exist

	if (errors.length > 0) {
		//If there are issues with the form, reject the form and re-render it with user values
		res.render("register.ejs", {
			errors,
			name,
			password,
			confirmPassword,
		});
	} else {
		//Everything passes here
		//Validating passes
		User.findOne({ name: name }).then(async (user) => {
			if (user) {
				errors.push({ msg: "Username already exists" });
				res.render("register.ejs", {
					errors,
					name,
					password,
					confirmPassword,
				});
			} else {
				try {
					const hashedPassword = await bcrypt.hash(password, 10);
					const newUser = new User({ name, password: hashedPassword });
					console.log(newUser);
					newUser
						.save()
						.then((user) => res.redirect("/users/login"))
						.catch((err) => res.status(500).redirect("/register"));
				} catch {
					return res.status(500).send();
				}
			}
		});
	}
});

module.exports = route;
