const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration');
const User = require('./models/User');

// JSON WEB TOKEN STRATEGY
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
			secretOrKey: JWT_SECRET,
		},
		async (payload, done) => {
			// payload is the object defined in JWT helper in the user controller
			try {
				// Find the user specified in the token
				const user = await User.findById(payload.sub);
				// If user doesn't exist, handle it
				if (!user) {
					return done(null, false);
				}
				// Otherwise, return the user
				// done takes 2 arguments (error,object)
				// and it exit the function
				done(null, user);
			} catch (err) {
				done(error, false);
			}
		}
	)
);

// LOCAL STRATEGY

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				// Find the user given the email
				const user = await User.findOne({ email });
				// If not handle it
				if (!user) {
					return done(null, false);
				}
				// Check if the password is correct
				const isMatch = await user.isValidPassword(password);
				// If not handle it
				if (!isMatch) {
					return done(null, false);
				}
				// Otherwise, return the user
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);
