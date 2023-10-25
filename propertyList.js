const mysql_connector = require('mysql');

var connection = mysql_connector.createConnection({
  host: "localhost",
  user: "root",
  password: "KnowTheName3472!",
  database: "real_estate"
});

connection.connect(function(error) {
  if (error) throw error;
  console.log("Connection successful");
});

var propertyList = [];

try {
  const getAllQuery = "SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties INNER JOIN Brokers ON Properties.BrokerID = Brokers.BrokerID";
  connection.query(getAllQuery, function (error, result) {
    try {
      if (error) {
        throw error;
      }
      result = JSON.parse(JSON.stringify(result));
      for (property of result) {
        var newProperty = {property_ID: property['PropertyID'], broker_name: property['BrokerFullName'], address: property['Address'], going_price: property['GoingPrice'],  amenities: property['Amenities'], num_bedrooms: property['NumBedrooms'], num_bathrooms: property['NumBathrooms']};
        propertyList.push(newProperty);
      }
    }
    catch(error) {
      console.log(`Error (Property Information): Unable to retrieve property information.`);
    }
  });
}
catch(error) {
  console.log(error.message);
}

module.exports = propertyList;
