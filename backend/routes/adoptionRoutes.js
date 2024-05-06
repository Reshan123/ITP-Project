const express = require('express')
const { authorize } = require('../middlewear/validateToken')

const {
    getAdoptionForms,
    getAdoptionForm,
    createAdoptionForm,
    deleteAdoptionForm,
    updateAdoptionForm,
    getUserAdoptionListings
} = require('../controllers/adoptionController')

const router = express.Router()

//Get All adoption forms
router.get('/', getAdoptionForms)

//GET USER ADOPTION FORM
router.get('/getUSER', authorize, getUserAdoptionListings)

//Get Specific adoption forms
router.get('/:id', getAdoptionForm)

//Create an adoption form
router.post('/', authorize, createAdoptionForm)

//Delete and adoption form
router.delete('/:id', deleteAdoptionForm)

//Update an adoption form
router.patch('/:id', updateAdoptionForm)




module.exports = router