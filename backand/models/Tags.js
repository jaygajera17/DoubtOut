const mongoose = require('mongoose');
const {Schema} = mongoose;

const TagSchema = new Schema({
    tagname:{
        type:String,
        required: true
    },

    desc:{
        type:String,
        required:true
    }
})
const tag = mongoose.model('tag', TagSchema);
tag.createIndexes();
module.exports = tag;