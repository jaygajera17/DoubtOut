const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://darshitbhuva9330:Bhuva2002@cluster0.rzduo6z.mongodb.net/DoubtOut";

const connectToMongo = () =>{
    mongoose.connect(process.env.mongoURI || mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;
