const express = require("express")
const router = express.Router()
const {signUp, login} = require("../controllers/usersController")
const validateEmailPassword = require("../middleware/validateEmailPassword")

router.post('/', validateEmailPassword, signUp)

router.post('/login', validateEmailPassword, login)

module.exports = router