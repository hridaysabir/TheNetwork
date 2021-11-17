const User = require('../../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../../util/validators')

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, process.env.SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async login(_, {username, password}) {
           const {errors, valid} = validateLoginInput(username, password)
           const user = await User.findOne({username})

           if (!valid) {
               throw new UserInputError('Errors', {errors})
           }
           else if (!user) {
               throw new UserInputError('User not found.')
           }

           const match = await bcrypt.compare(password, user.password)
           if (!match) {
                throw new UserInputError('Wrong credentials')
           }

           const token = generateToken(user)

           return {
            ...user._doc,
            id: user._id,
            token
        }

        },
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

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}