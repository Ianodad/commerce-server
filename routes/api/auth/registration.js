const express = require('express');
const router = express.Router();

const { User, validate, hash} = require("../../../models/user");

// Get all users
router.get('/', (req, res) => {
    // const users = await User.find()
   
    res.send("hello")
});


router.post("/registration", async (req, res)=> {
    
    console.log(req.body)
    const { error } =  validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);
    

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    const newUser = new User ({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : await hash(req.body.password)
    })

    await newUser.save()

    res.send(newUser)    

})


// router.post("/check", async(req, res) => {
//     let user = await User.findOne({ email: req.body.email });
    
//     if (user) return res.status(400).send({msg: `${req.body.email} already registered.`, state: true});    
// })

router.get('/asyncValidate', async (req, res) => {
    
    const emails = await User.find().distinct("email")
    res.send(emails)
})


module.exports = router;