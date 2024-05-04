const Supplier = require('../models/supplierDoc')

//get all supplier
const getallSupplier = async(req,res)=>
{
    const supplier = await Supplier.find({}).sort({createdAt:-1}) 
    //createdAt -1 will put the newly added suppliers on top

    res.status(200).json(supplier)
}
//get a single suppliers
const getSupplier = async(req,res)=>
{
    const { id } = req.params
    const supplier = await Supplier.findById(id)

    if(!supplier)
    {
        return res.status(404).json({error: 'No such supplier'})
    }

    res.status(200).json(supplier)
}

//create supplier
const createSupplier =  async(req,res) => {
    const {supplierName, supplierContact, supplierEmail, supplierCompany, itemId} = req.body

    try{
        const supplier = await Supplier.create({supplierName, supplierContact, supplierEmail, supplierCompany, itemId})
        res.status(200).json(supplier)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//update supplier
const updateSupplier = async(req,res) =>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item in the inventory' })

    }

    const supplier = await Supplier.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!supplier)
    {
        return res.status(404).json({error: 'No such supplier'})
    }
    res.status(200).json(supplier)

}

//delete supplier  
const deleteSupplier = async (req,res) =>
{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item in the inventory' })

    }
    
    const supplier = await Supplier.findByIdAndDelete({_id: id})

    if(!supplier)
    {
        return res.status(404).json({error: 'No such supplier'})
    }

    res.status(200).json(supplier)
}

module.exports = {
    getallSupplier,
    getSupplier,
    createSupplier,
    deleteSupplier,
    updateSupplier

}