const User = require('../../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server');

module.exports = {
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword }}) {
            //TODO: Validate user
            //TODO: Hash password and auth token

            //If user exists already, throw an error.
            const user = await User.findOne({ username })

            if (user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "This username is taken."
                    }
                })
            }

            //bcrypt hashes the password in 12 rounds
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username,
            }, process.env.SECRET_KEY, {expiresIn: '1h'});

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}