const express =  require('express');
const mongoose = require("mongoose")
const cors = require("cors");

const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,    
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json())


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




