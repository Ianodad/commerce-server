const express = require('express');
const router = express.Router();

const { User, validate } = require("../../../models/user");

// Get all users
router.get('/', (req, res) => {
    // const users = await User.find()
   
    res.send("hello")
});


router.post("/", async (req, res)=> {
    
    console.log(req.body)
    const { error } =  validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);
    

    // let user = await User.findOne({ email: req.body.email });
    // if (user) return res.status(400).send("User already registered.");

    const newUser = new User ({
        firstName : req.body.firstName,
        lastName : req.body.lastName
        // email : req.body.email
    })

    await newUser.save()

    res.send(newUser)    

})

module.exports = router;