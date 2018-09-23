const JWT = require('jsonwebtoken');
const User = require('../models/User');
const {
	JWT_SECRET
} = require('../configuration');
signToken = (user) => {
	return JWT.sign({
			iss: `simongodefroid`,
			sub: user.id, // subject
			iat: new Date().getTime(), // issued at [current time]
			exp: new Date().setDate(new Date().getDate() + 1), // expires at [current time + 1 day]
		},
		JWT_SECRET
	);
};

module.exports = {
	signUp: async (req, res, next) => {
			console.log('UsersController.signUp() called');
			const {
				email,
				password
			} = req.value.body;
			// Check if there is a user with the same email
			const foundUser = await User.findOne({
				'local.email': email
			});
			if (foundUser) {
				return res.status(403).send({
					error: 'Email is already in use'
				});
			}
			// Create a new user
			const newUser = new User({
				method: 'local',
				local: {
					email: email,
					password: password
				},
			});
			await newUser.save();

			// Generate the token
			const token = signToken(newUser);

			// Respond with token
			res.status(200).json({
				token
			});
		},
		signIn: async (req, res, next) => {
				const token = signToken(req.user);
				res.status(200).json({
					token
				});
			},
			googleOAuth: async (req, res, next) => {
					// Generate token
					const token = signToken(req.user);
					res.status(200).json({
						token
					});
				},
				facebookOAuth: async (req, res, next) => {
						// Generate token
						const token = signToken(req.user);
						res.status(200).json({
							token
						});
					},
					secret: async (req, res, next) => {
						res.json({
							secret: 'Resource'
						});
					},
};
