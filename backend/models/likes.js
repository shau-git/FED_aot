const {DataTypes} = require("sequelize")
const sequelize = require("../db/connect")

const Likes = sequelize.define('like', {
    like_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
        validate: {
            notNull: {args: true, msg: 'like_id cannot be null'},
            isInt: {args:true, msg: "like_id must be an int"},
            min: {args: [0], msg: "like_id cannot be negative"}
        }
    },
    user_id: {
        type: DataTypes.SMALLINT,
        allowNull: false, 
        references: {
            model: "users",
            key: "user_id",
        },
        validate: {
            notNull: {args: true, msg: 'user_id cannot be null'},
            isInt: {args:true, msg: "user_id must be an int"},
            min: {args: [0], msg: "user_id cannot be negative"}
        }
    },
    character_id: {
        type: DataTypes.SMALLINT,
        allowNull: false, 
        validate: {
            notNull: {args: true, msg: 'character_id cannot be null'},
            isInt: {args:true, msg: "character_id must be an int"},
            min: {args: [0], msg: "character_id cannot be negative"}
        }
    }
},{
    timestamps: false,
    tableName: 'likes'
})

module.exports = Likes