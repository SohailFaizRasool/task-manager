require('dotenv').config()

//core imports
const express = require("express")

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const cors = require('cors');
//my imports
const taskRoutes = require('./routes/task')

const errorHandler= require("./middle-wares/errorHandler")

const notFound = require('./middle-wares/notFound')

// variable initiallization

//initiallization
const app= express()
console.log("Some request Entered");

//middle wares
// app.use(bodyParser.urlencoded({extended: true}))//this is for html form data
app.use(cors())
app.use(express.json())
//routes
app.use('/api/v1/tasks', taskRoutes);

//errors
app.use(notFound);
app.use(errorHandler)

//database connecting and listening
mongoose.connect(process.env.MONGODB_URI,{writeConcern: { w: 'majority' },}).then(result=>{
    app.listen(3000, function(){
        console.log("server started at port http://localhost:3000/");
    })
}).catch(error=>{
    console.log(error);
})

