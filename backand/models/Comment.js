const mongoose = require('mongoose')
const { Schema } = mongoose;

const CommentSchema = new Schema({

    // Id of Question
    questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },

    // Answer posted By user
    answerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'answer'
    },
    // Id Of User who has posted answer for perticular question
    postedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    //  username of user who has posted Answer for perticular question
    postedBy: {
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },

    date:{
        type:Date,
        default:Date.now
    },
})

const comment = mongoose.model('comment', CommentSchema);
comment.createIndexes();
module.exports = comment;