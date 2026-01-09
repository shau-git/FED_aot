const express = require("express")
const router = express.Router()

const {
    getAllLikes,
    likeCharacter,
    deleteLike
} = require("../controllers/likesController")


router.route('/')
    .get(getAllLikes)
    .post(likeCharacter)
    .delete(deleteLike)


module.exports = router