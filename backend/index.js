const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Broker = require('./models/Brokers')
const Property = require('./models/Properties')
const Offer = require('./models/Offers')

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'slhafhafsaflAH'

mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', 
}))

const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

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

app.post('/submitOffer', async (req, res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
  var {currentAddress, offer} = req.body
  try {
    const offerDoc = await Offer.create({
      address: currentAddress,
      offer: offer
    });
    res.json({propertyDoc})
  }
  catch (e) {
    res.status(422).json({ error: "Offer failed. Please try again later" });
  }
})

app.post('/createProperty', async (req, res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    var {address, price, type, bedrooms, bathrooms, size} = req.body;
    console.log(req.body);
    try{
        const propertyDoc = await Property.create({
            address: address,
            goingPrice: price,
            propertyType: type,
            numBedrooms: bedrooms,
            numBathrooms: bathrooms,
            propertySize: size
        });
        res.json({propertyDoc})
    }
    catch (e){
        res.status(422).json({ error: "Property creation failed. Please try again later" });
    }
  })

app.post('/login', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    const {email,password} = req.body
    const brokerDoc = await Broker.findOne({email})

    if(brokerDoc){
        const passOk = bcrypt.compareSync(password, brokerDoc.password)   
        if (passOk) {
            jwt.sign({
                email: brokerDoc.email, 
                id:brokerDoc._id}, 
                jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(brokerDoc)
            });
        } 
        else{
            res.status(422).json('pass not ok')
        }

    } else{
        res.json('not found')
    }


}) 

app.post('/deleteProperty', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    console.log("req.body: ");
    console.log(req.body);
    const address = req.body.address
    console.log(address);
    await Property.deleteOne({"address": String(address)})
  })

  app.post('/editProperty', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    console.log("req.body: ");
    console.log(req.body);
    const {currentAddress, newAddress, newPrice, newType, newBedrooms, newBathrooms, newSize} = req.body
    const propertyDoc = await Property.updateOne(
      {address: String(currentAddress)},
      {
        address: newAddress,
        goingPrice: newPrice,
        propertyType: newType,
        numBedrooms: newBedrooms,
        numBathrooms: newBathrooms,
        propertySize: newSize
      }
    )
    const offerDoc = await Offer.updateMany(
      {address: String(currentAddress)},
      {
        address: newAddress,
      }
    )
  })

  app.post('/findOffersByAddress', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    console.log("req.body: ");
    console.log(req.body);
    const {currentAddress} = req.body
    const offerDoc = await Offer.find(
      {address: String(currentAddress)},
    )
    if(offerDoc){
      res.json(offerDoc);
    } 
    else{
        res.status(422).json('pass not ok')
    }
  })
  
  app.get('/getAllProperties', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    var propertyDoc = await Property.find();
    if(propertyDoc){
      res.json(propertyDoc);
    } 
    else{
        res.status(422).json('pass not ok')
    }
  })
  
  app.post('/searchProperties', async (req,res) => {
      mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
      const {address,maxSize,minSize,maxPrice,minPrice,bedrooms,bathrooms,type} = req.body
      console.log(req.body);
      console.log(address);
      var propertyDoc = await Property.find();
      console.log(propertyDoc);
      if (!isNullOrEmpty(address)) {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.address.toLowerCase().includes(address.toLowerCase());
          });
        }
        if (!isNullOrEmpty(maxSize)) {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.propertySize <= parseFloat(maxSize);
          });
        }
        if (!isNullOrEmpty(minSize)) {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.propertySize >= parseFloat(minSize);
          });
        }
        if (!isNullOrEmpty(maxPrice)) {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.goingPrice <= parseFloat(maxPrice);
          });
        }
        if (!isNullOrEmpty(minPrice)) {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.goingPrice >= parseFloat(minPrice);
          });
        }
        if (!isNullOrEmpty(bedrooms) && bedrooms != 'noselection') {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.numBedrooms == parseInt(bedrooms);
          });
        }
        if (!isNullOrEmpty(type)) {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.propertyType == type;
          });
        }
        if (!isNullOrEmpty(bathrooms) && bathrooms != 'noselection') {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.numBathrooms == parseInt(bathrooms);
          });
        }
        
        if(propertyDoc){
          //console.log(propertyDoc);
          res.json(propertyDoc);
        } 
        else{
            res.status(422).json('pass not ok')
          }
      }) 



      
  


app.listen(3001, () => {
    console.log("server is running")

})

