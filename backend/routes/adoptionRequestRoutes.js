const express = require('express')
const { authorize } = require('../middlewear/validateToken')
const {
    getallRequestForms,
    getRequestForm,
    createRequestForm,
    deleteRequestForm,
    updateRequestForm,
    getUserRequestForm
} = require('../controllers/adoptionRequestContoller')


const router = express.Router()

//getallforms
router.get('/getAll', getallRequestForms)

//get user form
router.get('/getUserForm', authorize, getUserRequestForm)

//get one form using form id
router.get('/getOne/:id', getRequestForm);


//create
router.post('/createForm', authorize, createRequestForm)

//Delete and adoption form
router.delete('/:id', deleteRequestForm)

//Update an adoption form
router.patch('/:id', updateRequestForm)

module.exports = router