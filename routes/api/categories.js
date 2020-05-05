const express = require('express');
const router = express.Router();
const { category } = require("../../models/category");


// Get all users
router.get('/', (req, res) => {
    // const users = await User.find()
   
    res.send("hello")
});

router.get("/", async(req, res)=> {
   const products = await Product
        .find()
        .populate('category company')
        .sort({
            index: 1
        });

    res.send(products)
})


module.exports = router