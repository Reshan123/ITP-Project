const doctor = require('../models/doctorModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET , { expiresIn: '3d' })
}

const login = async (req, res) => {
    
    const {email, password} = req.body

    try {
        const user = await doctor.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username: user.name, email: user.email,contactNo: user.contactNo, availability: user.availability, userToken: token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const createDoctor = async (req, res) => {

    const {name, email, password, contactNo, availability} = req.body

    try{
        const user = await doctor.createDoctorStatic(name, email, password, contactNo, availability)

        res.status(200).json(user)

    } catch (error){
        res.status(400).json({message: error.message})
    }

}

const updateDoctorDetailsFromToken = async (req, res) => {
    const userID = req.user._id

    try{
        const doc = await doctor.findById(userID)
        doc.availability = !doc.availability;
        await doc.save();
        
        res.status(200).json({username: doc.name, email: doc.email,contactNo: doc.contactNo, availability: doc.availability})
        

    } catch (error){
        res.status(400).json({message: error.message})
    }

}

const deleteDoctorDetailsFromToken = async (req, res) => {
    const userID = req.user._id
    try{
        const userExist = await doctor.findById(userID)
        if (!userExist){
            throw Error("User doesnt exist")
        }

        const response = await doctor.findByIdAndDelete(userID)
        
        res.status(200).json({message: "User removed"})
    } catch (error){
        res.status(400).json({message: error.message})
    }
}


const getAllDocs = async (req, res) => {
    try{
        const response = await doctor.find()
        if (!response){
            throw Error("Couldnt Fetch Data")
        }
        res.status(200).json(response)
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const updateDoctorFromID = async (req, res) => {

    const { docID } = req.params;
    const { name, email, password, contactNo } = req.body;

    try{
        if (!name || !email || !contactNo) {
            throw Error('All fields must be filled')
        }
        if(!validator.isAlpha(name, ['en-US'], {ignore: '-s'})){
            throw Error('Name can only have letters')
        }
        if (!validator.isEmail(email)) {
          throw Error('Email not valid')
        }
        if (password) {
            if (!validator.isStrongPassword(password)) {
                throw Error('Password not strong enough')
            }

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const response = await doctor.findByIdAndUpdate(docID, {
                name,
                email,
                password: hash,
                contactNo
            })

            res.status(200).json({response})
            return;
        } else {
            const response = await doctor.findByIdAndUpdate(docID, {
                name,
                email,
                contactNo
            })
            
            res.status(200).json({response})
        }
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

//get all avaiable doctors
const getAvailableDoctors = async(req,res) => {
    try{
        const doctors = await doctor.find({ availability: true }).select('name');
        res.status(200).json(doctors)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const deleteDoctorFromID = async (req, res) => {
    const { docID } = req.params;

    try{
        const userExist = await doctor.findById(docID)
        if (!userExist){
            throw Error("User doesnt exist")
        }

        const response = await doctor.findByIdAndDelete(docID)
        
        res.status(200).json({message: "User removed"})
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

module.exports = { 
    login, 
    createDoctor, 
    updateDoctorDetailsFromToken, 
    deleteDoctorDetailsFromToken, 
    getAllDocs, 
    getAvailableDoctors, 
    updateDoctorFromID,
    deleteDoctorFromID 
}