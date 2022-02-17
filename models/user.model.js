const { Schema, model } = require('mongoose')

const SchemaUser = new Schema({

    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    }
    
})

const userModel = model('user', SchemaUser)
module.exports = userModel;
