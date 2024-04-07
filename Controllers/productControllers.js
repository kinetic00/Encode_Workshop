const {default: mongoose} = require('mongoose')
const Product = require('../Models/productModels')

const getAllProduct = async(req, res) =>{
    const product = await Product.find({}).sort({createdAt : -1})
    res.status(200).json(product)
}

const getProduct = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.statur(400).json({error: "Not a valid DB ID."})
    }

    const product = await Product.findById(id)
    
    if (!product){
        return res.status(404).json({ error: 'The product does not exist' })
    }

    res.status(200).json(product)
}

const addProduct = async (req, res) => {
    const {Name, Description, Quantity, BuyingPrice, MRP, Category} = req.body

    try{
        const product = await Product.create({Name, Description, Quantity,BuyingPrice, MRP, Category})
        res.status(201).json(product)
    }catch(error) {
        res.status(500).json({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json("Invalid DB ID.")
    }

    const product = await Product.findByIdAndUpdate({_id: id}, req.body , {
        runValidators: true,
        new:true,
    })

    if(!product){
        return res.status(404).json({error: 'Product not found'})
    }

    res.status(201).json(product)
}

const deleteProduct = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invaild Id')
    }

    const product = await Product.findById({_id : id})
    
    if (!product) {
        return res.status(404).json({error: 'Product not found'})
    }

    res.status(200).json(product)
}

module.exports ={
    getAllProduct,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}