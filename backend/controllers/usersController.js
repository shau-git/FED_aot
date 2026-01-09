const {UnauthenticatedError, BadRequestError} = require("../errors/errors")
const asyncWrapper = require("../middleware/async")
const User = require("../models/users")


// POST
const signUp = asyncWrapper(async(req, res) => {
    console.log(req.body)
    let {email, password} = req.body

    // Checking if an email already exists in the database
    const duplicateEmail = await User.findOne({
        where: { email }
    });

    if (duplicateEmail) {
        throw new BadRequestError(`${email} already exist`)
    }

    // hashing the password, and get the new req.body
    const newUser  = await User.hashPassword({email, password})

    // insert user data to DB
    const user = await User.create(newUser)

    // Genrenate JWT token
    const token = user.createJWT()
    const response = {
        user_id: user.user_id, 
        email: user.email, 
    }

    res.status(201).json({user: response, token})
})

// POST
const login = asyncWrapper(async(req, res) => {
    const {email, password} = req.body
    
    // Validate user credentials
    const user = await User.findOne({
        where: {email}
    })

    if(!user) {
        throw new UnauthenticatedError("Invalid Credentials")
    }

    // Compare password with hash
    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect) {
        throw new BadRequestError("Password incorrect")
    }

    // Genrenate JWT token
    const token = user.createJWT()
    const response = {
        user_id: user.user_id, 
        email: user.email, 
    }

    return res.status(200).json({user: response, token})
})



module.exports = {signUp, login}