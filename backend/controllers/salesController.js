const salesItem = require('../models/salesModel')

//get all sales
const getAllSales = async(req,res) => {
    const salesItems = await salesItem.find({}).sort({CreatedAt: -1})
    res.status(200).json(salesItems)
}

//get a specific sale
const getSpecificSale = async(req, res) => {

    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such item'})
    }

    const salesItems = await salesItem.findById(id)

    if(!salesItems){
        return res.status(400).json({error:'No such item'})
    }

    res.status(200).json(salesItems)
}

//add a new sale
const addNewSale = async(req,res) => {
    try{
    const salesItems = await salesItem.create({itemName, itemPrice, itemQuantity, totalPurchase})

    res.status(200).json(salesItems)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//update a sale
const updateSale = async(req, res) => {
    const{ id } = req.params
  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such item'})
    }

    const salesItems = await salesItem.findOneAndUpdate({_id: id}, {...req.body})

    if(!salesItems){
        return res.status(400).json({error:'No such item'})
    }

    res.status(200).json(salesItems)
}

//Delete a sale
const deleteSale = async(req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such item'})
    }

    const salesItems = await salesItem.findOneAndDelete({_id: id})

    if(!salesItems){
        return res.status(400).json({error:'No such item'})
    }

    res.status(200).json(salesItems)
}

module.exports = {
                    getAllSales,
                    getSpecificSale,
                    updateSale,
                    addNewSale,
                    updateSale,
                    deleteSale
}