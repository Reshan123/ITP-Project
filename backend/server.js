require('dotenv').config()
const express =  require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const { authorize } = require('./middlewear/validateToken')


const petOwnerRoutes = require('./routes/petOwnerRoutes')
const inventoryItemRoutes = require('./routes/inventoryitemsRoutes')
const lostPetNoticeRoutes = require('./routes/lostPetNoticeRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const adoptionFormRoutes = require('./routes/adoptionRoutes')
const petRoutes = require('./routes/petRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const medicalRecordRoute = require('./routes/medicalRecordRoute')
const messageRoutes = require('./routes/messageRoutes')
const supplierRoutes = require('./routes/supplierRoutes')
const { app, server } = require("./socket/socket");

//const app = express()
const salesRoutes = require('./routes/salesRoutes')
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
app.use(express.static('Images'))


//Routes
app.use("/api/petOwner", petOwnerRoutes)
app.use('/api/inventoryItems', inventoryItemRoutes)
app.use('/api/lostPetNotice',lostPetNoticeRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/adoption', adoptionFormRoutes)
app.use('/api/pet', petRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/medical-records', medicalRecordRoute);
app.use("/api/supplier", supplierRoutes);
app.use("/api/messages", messageRoutes);
<<<<<<< HEAD
=======
app.use("/api/sales", salesRoutes)
>>>>>>> Sales-Management-System


app.use('/api/admin/login', (req, res) => {
    const {email, password} = req.body

    if (email == "john@email.com" && password == "john1234"){
        res.status(200).json({username: "John Admin"})
    } else {
        res.status(400).json({message: "Invalid Credentials"})
    }
})


mongoose.connect(process.env.MONGOOSE_URI)
    .then(() => {
        const PORT = server.listen(process.env.PORT, () => {
          console.log("Connected to db listening on ", process.env.PORT);
        }); 
    })
    .catch((error) => {
        console.log(error)
    }
    
)




