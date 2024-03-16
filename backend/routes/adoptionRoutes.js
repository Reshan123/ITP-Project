const express = require('express')

const{
    getAdoptionForms,
    getAdoptionForm,
    createAdoptionForm,
    deleteAdoptionForm,
    updateAdoptionForm
} = require('../controllers/adoptionController')

const router = express.Router()

//Get All adoption forms
router.get('/', getAdoptionForms)

//Get Specific adoption forms
router.get('/', getAdoptionForm)

//Create an adoption form
router.post('/', createAdoptionForm)

//Delete and adoption form
router.delete('/:id', deleteAdoptionForm)

//Update an adoption form
router.patch('/:id', updateAdoptionForm)

module.exports = router