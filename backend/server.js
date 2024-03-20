require('dotenv').config()
const express =  require('express')
const mongoose = require("mongoose")
const cors = require("cors")


const petOwnerRoutes = require('./routes/petOwnerRoutes')
const inventoryItemRoutes = require('./routes/inventoryitemsRoutes')
const lostPetNoticeRoutes = require('./routes/lostPetNoticeRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const adoptionFormRoutes = require('./routes/adoptionRoutes')
const petRoutes = require('./routes/petRoutes')

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
app.use("/api/petOwner", petOwnerRoutes)
app.use('/api/invetoryItems', inventoryItemRoutes)
app.use('/api/lostPetNotice',lostPetNoticeRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/adoption', adoptionFormRoutes)
app.use('/api/pet', petRoutes)



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




