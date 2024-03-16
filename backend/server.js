const express =  require('express');
const mongoose = require("mongoose")
const cors = require("cors");
const adoptionFormRoutes = require('./routes/adoptionRoutes.js')

const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,    
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
  
//Routes
app.use('/api/routes', adoptionFormRoutes)

//Connect to db
mongoose.connect("mongodb+srv://reshangomis:dSq14MkjCGA5mxz3@itp-project.4h3vlxi.mongodb.net/?retryWrites=true&w=majority&appName=ITP-Project")
    .then(() => {
        const PORT = app.listen(4000, () => {
            console.log("Connected to db listening on 4000");
        }) 
    })
    .catch((error) => {
        console.log(error)
    }
)




