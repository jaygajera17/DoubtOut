const mongoose = require('mongoose')
const { Schema } = mongoose;

const AnswerSchema = new Schema({

    // Id of Question
    questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },

    // Answer posted By user
    answer:{
        type:String,
        required:true
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

    upvotes:{
        type:Number,
        required:true
    },

    downvotes:{
        type:Number,
        required:true
    }
})

const answer = mongoose.model('answer', AnswerSchema);
answer.createIndexes();
module.exports = answer;