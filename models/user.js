const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		default: ""
	},
	nick: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: "role_user"
	},
	image: {
		type: String
	},
	bio: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now()
	}
});

module.exports = model("User", UserSchema)