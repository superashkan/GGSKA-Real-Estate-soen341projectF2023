const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Broker = require('./models/Brokers')

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'slhafhafsaflAH'

mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', 
}))



app.post('/register', async (req, res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    const {name, email, password} = req.body;
    try{
        const brokerDoc = await Broker.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
    
        });
        
        res.json({brokerDoc})
    }

    catch (e){

        res.status(422).json({ error: "Registration failed. Please try again later" });
    }

})

app.post('/login', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    const {email,password} = req.body
    const brokerDoc = await Broker.findOne({email})

    if(brokerDoc){
        const passOk = bcrypt.compareSync(password, brokerDoc.password)   
        if (passOk) {
            jwt.sign({email: brokerDoc.email, id:brokerDoc._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json('pass ok')
            });
        } 
        else{
            res.status(422).json('pass not ok')
        }

    } else{
        res.json('not found')
    }


}) 




app.listen(3001, () => {
    console.log("server is running")

})

