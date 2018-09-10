const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema
const userSchema = new Schema({
	method: {
		type: String,
		enum: [ 'local', 'google', 'facebook' ],
		required: true,
	},
	local: {
		email: { type: String, lowercase: true },
		password: { type: String },
	},
	google: {
		id: { type: String },
		email: { type: String, lowercase: true },
	},
	facebook: {
		id: { type: String },
		email: { type: String, lowercase: true },
	},
	// email: { type: String, required: true, unique: true, lowercase: true },
	// password: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
	try {
		// due to oauth addition
		if (this.method !== 'local') {
			next();
		}

		// Generate a salt
		const salt = await bcrypt.genSalt(10);
		// Generate a password hash (salt + hash)
		// const passwordHashed = await bcrypt.hash(this.password, salt); // due to oauth addition
		const passwordHashed = await bcrypt.hash(this.local.password, salt);
		// Re-assign hashed version over original, plain text password
		this.local.password = passwordHashed;
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isValidPassword = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.local.password);
	} catch (error) {
		throw new Error(error);
	}
};

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
