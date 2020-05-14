const express = require('express');
const router = express.Router();


const { User, validateLogin, decrypt,  generateAuthToken } = require("../../../models/user");


router.post('/login', async (req, res) => {
    console.log(req.body)
    const {
        error
    } = validateLogin(req.body);

    console.log(error)
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({
        email: req.body.email
    })
    
    console.log(user)
    if (!user) return res.status(400).send('Invalid email or password')
    console.log(user.password)
    const validPassword = await decrypt(req.body.password, user.password)
    console.log("this")
    if (!validPassword) return res.status(400).send('Invalid password')
    
    console.log(validPassword)
    const token = generateAuthToken();
    console.log(token)

    res.status(200).header("x-auth-token", token).header("access-control-expose-headers", "x-auth-token").send(token)
})

router.post('/logout', async (req, res) => {
    
})

module.exports = router;