const connectToMongo = require('./db') //importing connectToMongo from db.js
const express = require('express');
var cors = require('cors') //importing cors to allow cross - origin resource sharing 


connectToMongo();
const app =express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000',//Specify frontend port
    optionsSuccessStatus:200
}))
app.use(express.json())


//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send("Anirudh!!")}
)
 
app.listen(port , ()=>{
    console.log(`iNoteBook App Backend Listening at http://localhost:${port}`);
})
