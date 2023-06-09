const Product = require('../models/search')
// GET Product By Key(name of drug)
const getProductByKey= async function(req, res){
    try{
        let data =await Product.find({
          "$or":[
            {DrugName:{$regex:req.params.key}}
          ]
        })
        if(!data.length){
          return res.status(404).send('unable to find')
        }
        res.send(data)
        console.log(data)
      }
      catch(e){
        res.status(400).send(e)
      }
}
// GET ALL Products
const getAllProduct=async function(req,res){
    Product.find({}).then ((products) =>{
        res.status(200).send(products)
    }).catch((e) => {
        res.status(500).send(e)
    })
}

// ADD New Product

const postNewProduct=async function (req,res){
    console.log(req.body)
  
    const product = new Product (req.body)
  
    product.save()
    .then ((product) => {res.status(200).send(product)})
  
    .catch((e)=>{ res.status(400).send(e)})

}

// update on product

const putFindAndUpdate=async function(req,res){
    try {
        // const DrugName = req.params.DrugName 
        const _id = req.params.id
        const product = await Product.findOneAndUpdate (_id , req.body , {
           new : true,
           runValidators : true
        })
        if(!product) {
           return res.status(404).send('No User Founded')
        }
        res.status(200).send(product)
     }
     catch(error) {
        res.status(400).send(error)
     }
}

// delete product

const deletProductById= async function(req,res){

    try {
        const _id = req.params.id
        const product = await Product.findOneAndDelete(_id)
        if(!product) {
           return res.status(404).send('UNABLE TO FIND THiS Drug')
        }
        res.status(200).send(product)
   }
   catch(e){
       res.status(400).send(e)
   }
}

module.exports= {
    getProductByKey,
    getAllProduct,
    postNewProduct,
    putFindAndUpdate,
    deletProductById
}