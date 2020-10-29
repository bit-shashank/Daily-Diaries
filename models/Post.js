const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	heading: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
