const Likes = require("../models/likes")
const asyncWrapper = require("../middleware/async")
const {BadRequestError} = require("../errors/errors")

// GET all
const getAllLikes = asyncWrapper(async(req, res) => {
    console.log(req)

    // get the user payload
    const payload = req.user

    const AllLikes = await Likes.findAll({
        where: {user_id: payload.user_id},
        order: [['character_id']]
    })

    console.log(AllLikes)

    if (AllLikes.length < 1) {
        res.status(200).json({total: AllLikes.length , msg: "No Likes"})
    } 

    res.status(200).json({total: AllLikes.length , results:AllLikes})
} )


// POST 
const likeCharacter = asyncWrapper(async(req, res) => {

    // get user payload
    const payload = req.user

    // get the character_id that the user want to like from the req.body
    let {character_id} = req.body

    if(!character_id || !parseInt(character_id) || parseInt(character_id) > 201 || parseInt(character_id) < 0) {
        throw new BadRequestError("Please provide charcater_id in Number which is greater than 0 and not more than 201")
    }

    // Checking if the like record for the user already exists in the database
    const duplicateCharacter = await Likes.findOne({
        where: { user_id: payload.user_id,  character_id }
    });

    if (duplicateCharacter) {
        throw new BadRequestError(`Character ${character_id} has been liked by you`)
    }


    // insert user data to DB
    const newLike = await Likes.create({user_id: payload.user_id, character_id})

    const updatedLikes = await Likes.findAll({
        where: { user_id: payload.user_id },
        order: [['character_id']]
    });

    res.status(201).json({total: updatedLikes.length, newLike, results: updatedLikes })

})


// DELETE
const deleteLike = asyncWrapper(async(req, res) => {

    console.log(req.body)

    // get user payload
    const payload = req.user

    // get the charcater_id that user want to remove from the req.body
    let {character_id} = req.body

    if(!character_id || !parseInt(character_id) || parseInt(character_id) > 201 || parseInt(character_id) < 0) {
        throw new BadRequestError("Please provide charcater_id in Number which is greater than 0 and not more than 201")
    }

    // Checking if the like record for the user is not existing in the database
    const characterLikeExist = await Likes.findOne({
        where: { user_id: payload.user_id,  character_id }
    });

    if (!characterLikeExist) {
        throw new BadRequestError(`You did not liked Character ${character_id}`)
    }

    // insert user data to DB
    const deleteLike = await Likes.destroy({
        where: {user_id: payload.user_id, character_id}
    })

    console.log(deleteLike)

    // Instead of just a "success" message, fetch the updated list
    const updatedLikes = await Likes.findAll({
        where: { user_id: payload.user_id },
        order: [['character_id']]
    });

    res.status(200).json({total: updatedLikes.length , msg: "delete successfully", results: updatedLikes  })

})

module.exports = {
    getAllLikes,
    likeCharacter,
    deleteLike
}