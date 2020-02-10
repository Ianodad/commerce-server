const express = require('express');
const router = express.Router();
const { Product, validate } = require("../../models/product");

// Get all Products

router.get("/", async(req, res)=> {
   const products = await Product
        .find()
        .populate('category company')
        .sort({
            index: 1
        });

    res.send(products)
})


// Get all users
router.post('/', async (req, res) => {
    // const users = await User.find()
   
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Get the category id from user mongodb
    // const category = await Category.findById(req.body.category)
    // if (!category) return res.status(400).send('Invalid category.');


    // save from body

        let product = new Product({
            isAvailable: (req.body.quantity > 0) ? true : false,
            image: !(req.body.image) ? "http://placehold.it/250x250" : (req.body.image),
            imageLg: !(req.body.imageLg) ? "http://placehold.it/1080x1080" : (req.body.imageLg),
            productName: req.body.productName,
            price: req.body.price,
            // category: category.id,
            quantity: req.body.quantity,
            rating: 0,
            description: req.body.description,
            reviews: []
        })
        // save product
        product = await product.save();
        res.send(product)



})

module.exports = router