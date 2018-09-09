module.exports = {
	signUp: async (req, res, next) => {
    // email and password
		console.log('Contents of req.value.body',req.value.body);
		console.log('UsersController.signUp() called');
	},
	signIn: async (req, res, next) => {
    // generate token
		console.log('UsersController.signIn() called');
	},
	secret: async (req, res, next) => {
		console.log('UsersController.secret() called');
	},
};
