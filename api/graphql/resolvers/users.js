const User = require('../../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server');
const { validateRegisterInput } = require('../../../util/validators')

module.exports = {
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword }}) {

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);

            if (!valid)  {
                throw new UserInputError('Errors', { errors });
            }
            
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

            //a new user with the hashed password is created
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date()
            });

            //new user is pushed to backend 
            //and a token with the backend response is created
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