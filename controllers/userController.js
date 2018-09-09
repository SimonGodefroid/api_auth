const User = require('../models/User');

module.exports = {
	signUp: async (req, res, next) => {
		console.log('UsersController.signUp() called');
		const { email, password } = req.value.body;
		// Check if there is a user with the same email
		const foundUser = await User.findOne({ email });
		if (foundUser) {
			return res.status(403).send({ error: 'Email is already in use' });
		}
		// Create a new user
		const newUser = new User({ email, password });
		await newUser.save();

		// Respond with token
		res.json({ user: 'created', success: true });
	},
	signIn: async (req, res, next) => {},
	secret: async (req, res, next) => {},
};
