require('dotenv').config()

const express =  require('express');
const mongoose = require('mongoose')
const cors = require('cors');


const petOwnerRoutes = require('./routes/petOwnerRoutes')
const inventoryItemRoutes = require('./routes/inventoryitemsRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,    
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))


app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use("/petOwner", petOwnerRoutes)
app.use('/api/invetoryItems', inventoryItemRoutes)
app.use('/api/bookings', bookingRoutes)



mongoose.connect(process.env.MONGOOSE_URI)
    .then(() => {
        const PORT = app.listen(process.env.PORT, () => {
            console.log("Connected to db listening on ",process.env.PORT);
        }) 
    })
    .catch((error) => {
        console.log(error)
    }
)




