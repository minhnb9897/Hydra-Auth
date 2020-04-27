const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User =  require('../model/user')
const db ="mongodb+srv://minhnb:minhlc97@hydraauthen-xpy0o.mongodb.net/HydraAuthen"
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(db, err => {
    if(err) {
        console.error('Error!' + err)
    } else {
        console.log('Connnected to mongodb')
    }
})

router.get('/', (req , res) => {
    res.send('From Api Route')
})

router.post('/register' , (req , res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error , registeredUser) => {
        if(error) {
            console.log(error)
        } else {
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email} , (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else 
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = { subject : user._id}
                    let token = jwt.sign(payload , 'secretKey')
                    res.status(200).send({token})
                }
        }
    })
})

module.exports = router