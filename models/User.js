const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema
const userSchema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
	try {
		// Generate a salt
		const salt = await bcrypt.genSalt(10);
		// Generate a password hash (salt + hash)
		const passwordHashed = await bcrypt.hash(this.password, salt);
		// Re-assign hashed version over original, plain text password
		this.password = passwordHashed;
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isValidPassword = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
