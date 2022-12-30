const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://jay_gajera:Happy108@cluster0.pv37rdy.mongodb.net/Doubtout";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;