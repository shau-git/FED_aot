const {DataTypes, Model} = require("sequelize")
const sequelize = require("../db/connect")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Users extends Model {
    // hased the password before saving
    static async hashPassword(user) {
        // check if the hashed_password field modified before
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user
    }

    // Instance method to create JWT (equivalent to Mongoose methods)
    createJWT() {
        return jwt.sign(
        { user_id: this.user_id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
        );
    }

    // Instance method to compare passwords
    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }

}


Users.init({
    user_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
        validate: {
            notNull: { args: true, msg: 'user_id cannot be null'},
            isInt: {args:true, msg: "character_id must be an int"},
            min: {args: [0], msg: 'user_id cannot be negative'}
        }
    },

    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true, // database will reject duplicates
        set(value) {
            this.setDataValue('email', value.trimEnd());
        },
        validate: {
            isEmail: {
                notNull: { args: true, msg: 'Email cannot be null'},
                args: true,
                msg: "Please enter a valid email address."
            },
            notEmpty: {msg: 'Email cannot be empty'},
            len: { args: [10, 80], msg: 'length of Email must be beteen 10 and 80'}
        }
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: { args: true, msg: 'Password cannot be null'},
            notEmpty: {msg: 'Password cannot be empty'}
        }
    },

},{
    sequelize,
    modelName: 'users',
    timestamps: false,
})

module.exports = Users