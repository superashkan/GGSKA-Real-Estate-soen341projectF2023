//https://www.w3schools.com/js/js_object_constructors.asp

class Property {
  constructor(propertyID_Input, brokerIDInput, brokerNameInput, addressInput, goingPriceInput, amenitiesInput, numBedroomsInput) {
    this.propertyID = propertyID_Input;
    this.brokerID = brokerIDInput;
    this.brokerName = brokerNameInput;
    this.address = addressInput;
    this.goingPrice = goingPriceInput;
    this.amenities = amenitiesInput;
    this.numBedrooms = numBedroomsInput;
  }
}

//https://stackoverflow.com/questions/40403909/how-to-require-a-class-in-node-js
module.exports = Property
