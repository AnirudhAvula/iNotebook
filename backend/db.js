const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/"


const connectToMongo =()=>{
      mongoose.connect(mongoURI);
}

module.exports=connectToMongo;

// (1) connect to database at the specified connection string (mongoURI - MongoDB Uniform Resource Identifier) 
//using mongoose and then exporting it so that we can use it in index.js