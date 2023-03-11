const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})

const admin = mongoose.model('admin', AdminSchema);
admin.createIndexes();
module.exports = admin;