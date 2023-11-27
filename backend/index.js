const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Broker = require('./models/Brokers')
const Property = require('./models/Properties')
const Offer = require('./models/Offers')
const Visit = require('./models/Visits')
const Review = require('./models/Reviews')

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
    const {name, email, password, age, phone, licenseNumber, agency} = req.body;
    try{
        const brokerDoc = await Broker.create({
            name: name,
            email: email,
            password:bcrypt.hashSync(password, bcryptSalt),
            age: age,
            phone_number: phone,
            license_number: licenseNumber,
            agency: agency
    
        });
        
        res.json({brokerDoc})
    }

    catch (e){

        res.status(422).json({ error: "Registration failed. Please try again later" });
    }

})

app.post('/findOffers', async (req, res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
  try {
    const offerIDDoc = await Offer.find()
    res.json(offerIDDoc)
  }
  catch(error) {
    res.status(422).json({ error: "Offer retrieval failed. Please try again later" });
  }
})

app.post('/submitOffer', async (req, res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
  var {currentAddress, highestID, offer, brokerName, brokerLicense, brokerAgency, clientInfo, deedDate, occupancyDate} = req.body
  try {
    const offerDoc = await Offer.create({
      offerID: parseInt(highestID),
      address: currentAddress,
      offer: offer,
      brokerName: brokerName,
      brokerLicense: brokerLicense,
      brokerAgency: brokerAgency,
      clientInfo: clientInfo,
      deedDate: deedDate.toString(),
      occupancyDate: occupancyDate.toString()
    });
    res.json({offerDoc})
  }
  catch (e) {
    res.status(422).json({ error: "Offer failed. Please try again later" });
  }
})

app.post('/createProperty', async (req, res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    var {brokerEmail, address, price, type, bedrooms, bathrooms, size, buyOrRent, propertyImageURL} = req.body;
    console.log(req.body);
    try{
        const propertyDoc = await Property.create({
            brokerEmail: brokerEmail,
            address: address,
            goingPrice: price,
            propertyType: type,
            numBedrooms: bedrooms,
            numBathrooms: bathrooms,
            propertySize: size,
            forRentOrPurchase: buyOrRent,
            propertyImageURL: propertyImageURL
        });
        res.json({propertyDoc})
    }
    catch (e){
        res.status(422).json({ error: "Property creation failed. Please try again later" });
    }
  })

  app.post('/createVisit', async (req, res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    var {address, visitorName, date, time} = req.body;
    console.log(req.body);
    try{
        const visitDoc = await Visit.create({
            propertyAddress: address,
            visitorFullName: visitorName,
            visitDate: date,
            visitTime: time
        });
        res.json({visitDoc})
    }
    catch (e){
        res.status(422).json({ error: "Visit scheduling failed. Please try again later" });
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
                res.cookie('token', token, {expires: new Date(365 * 24 * 60 * 60 * 1000)}).json(brokerDoc)
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
    const address = req.body.address
    console.log(address);
    await Property.deleteOne({"address": String(address)})
  })

  app.post('/editProperty', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    try{
      const {currentAddress, newAddress, newPrice, newType, newBedrooms, newBathrooms, newSize, newBuyOrRent, newPropertyImageURL} = req.body
      await Property.updateOne(
        {address: String(currentAddress)},
        {
          address: newAddress,
          goingPrice: newPrice,
          propertyType: newType,
          numBedrooms: newBedrooms,
          numBathrooms: newBathrooms,
          propertySize: newSize,
          propertyImageURL: newPropertyImageURL,
          forRentOrPurchase: newBuyOrRent
        }
      )
      await Offer.updateMany(
        {address: String(currentAddress)},
        {
          address: newAddress,
        }
      )
      await Visit.updateMany(
        {propertyAddress: String(currentAddress)},
        {
          propertyAddress: newAddress,
        }
      )
  }
  catch(err) {
    console.log(err);
  }}
  )

  app.post('/editBroker', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    const {currentEmail, newEmail, newPhone, newName, newAge, newLicenseNumber, newAgency} = req.body
    await Broker.updateOne(
      {email: String(currentEmail)},
      {
        email: newEmail,
        name: newName,
        phone_number: newPhone,
        license_number: newLicenseNumber,
        age: newAge,
        agency: newAgency 
      }
    )
  })

  app.post('/findOffersByAddress', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
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

  app.post('/findPropertyByAddress', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    const {propertyAddress} = req.body
    const propertyDoc = await Property.findOne(
      {address: String(propertyAddress)},
    )
    if(propertyDoc){
      res.json(propertyDoc);
    } 
    else{
        res.status(422).json('pass not ok')
    }
  })

  app.post('/findPropertiesByBroker', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    const {brokerEmail} = req.body.state
    const propertyDoc = await Property.find(
      {brokerEmail: String(brokerEmail)},
    )
    if(propertyDoc){
      res.json(propertyDoc);
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

  app.get('/getAllBrokers', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    var brokerDoc = await Broker.find();
    console.log(req.body);
    if(brokerDoc){
      res.json(brokerDoc);
    } 
    else{
        res.status(422).json('pass not ok')
    }
  })

  app.post('/findVisitsByAddress', async (req,res) => {
    mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
    const {propertyAddress} = req.body
    const visitDoc = await Visit.find(
      {propertyAddress: String(propertyAddress)},
    )
    if(visitDoc){
      res.json(visitDoc);
    } 
    else{
        res.status(422).json('pass not ok')
    }
  })
  
  app.post('/searchProperties', async (req,res) => {
      mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
      const {address,maxSize,minSize,maxPrice,minPrice,bedrooms,bathrooms,type} = req.body
      var propertyDoc = await Property.find();
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
        if (!isNullOrEmpty(bedrooms) && bedrooms !== 'noselection') {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.numBedrooms === parseInt(bedrooms);
          });
        }
        if (!isNullOrEmpty(type)) {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.propertyType === type;
          });
        }
        if (!isNullOrEmpty(bathrooms) && bathrooms !== 'noselection') {
          propertyDoc = propertyDoc.filter(function(property) {
            return property.numBathrooms === parseInt(bathrooms);
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

      app.post('/searchBrokers', async (req,res) => {
        mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
        const {firstName,lastName} = req.body
        var brokerDoc = await Broker.find();
        if (!isNullOrEmpty(firstName)) {
          brokerDoc = brokerDoc.filter(function(broker) {
              return broker.name.toLowerCase().includes(firstName.toLowerCase());
            });
          }
          if (!isNullOrEmpty(lastName)) {
            brokerDoc = brokerDoc.filter(function(broker) {
              return broker.name.toLowerCase().includes(lastName.toLowerCase());
            });
          }
        
          if(brokerDoc){
            res.json(brokerDoc);
          } 
          else{
              res.status(422).json('pass not ok')
            }
        }) 

app.post('/submitReview', async (req, res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA");
  try {
    const {brokerLicenseNumber, numStars, comments} = req.body;
    const reviewDoc = await Review.create({
          brokerLicense: brokerLicenseNumber,
          stars: numStars,
          comments: comments
      });
      res.json({reviewDoc})
  }
  catch(err) {
    res.status(422).json({ error: "Review submission failed. Please try again later" });
  }
})

app.post('/acceptOffer', async (req, res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA");
  try {
    const {address, offerID} = req.body;
    console.log(req.body);
    await Property.updateOne(
      {address: address},
      {
        displayed: false
      }
    )
    console.log("1");
    await Offer.updateMany(
      {},
      {
        accepted: false
      }
    )
    console.log("2");
    await Offer.updateOne(
      {offerID: offerID},
      {
        accepted: true
      }
    )
    console.log("3");
  }
  catch(err) {
    res.status(422).json({ error: "Offer acceptance failed. Please try again later" });
  }
})

app.post('/rejectOffer', async (req, res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA");
  try {
    const {address, offerID} = req.body;
    await Property.updateOne(
      {address: address},
      {
        displayed: true
      }
    );
    await Offer.updateOne(
      {offerID: offerID},
      {
        accepted: false
      }
    )
  }
  catch(err) {
    res.status(422).json({ error: "Offer rejection failed. Please try again later" });
  }
})

app.post('/findReviewsByBroker', async (req,res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA")
  const {brokerLicenseNumber} = req.body.state
  const reviewDoc = await Review.find(
    {brokerLicense: String(brokerLicenseNumber)},
  )
  if(reviewDoc){
    res.json(reviewDoc);
  } 
  else{
      res.status(422).json('pass not ok')
  }
})

app.post('/genericCalculateMortgage', async (req, res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA");
  try {
    const {principalLoan, monthlyInterestRate, numPayments} = req.body;
    var numerator = parseFloat(monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numPayments));
    var denominator = parseFloat(Math.pow(1 + monthlyInterestRate, numPayments) - 1);
    var monthlyMortgage = {"monthlyMortgage": parseFloat(principalLoan * (numerator / denominator)).toFixed(2)};
    res.json(monthlyMortgage);
  }
  catch(err) {
    res.status(422).json({ error: "Mortgage calculation failed. Please try again later" });
  }
})

app.post('/calculateMortgage', async (req, res) => {
  mongoose.connect("mongodb+srv://superashkan:GGSKA2023@cluster0.z3gchiw.mongodb.net/GGSKA");
  try {
    const {homePrice, downPayment, monthlyInterestRate, numPayments} = req.body;
    var principalLoan = homePrice - downPayment;
    var numerator = parseFloat(monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numPayments));
    var denominator = parseFloat(Math.pow(1 + monthlyInterestRate, numPayments) - 1);
    var monthlyMortgage = {"monthlyMortgage": parseFloat(principalLoan * (numerator / denominator)).toFixed(2)};
    res.json(monthlyMortgage);
  }
  catch(err) {
    res.status(422).json({ error: "Mortgage calculation failed. Please try again later" });
  }
})

app.listen(3001, () => {
    console.log("server is running")

})

