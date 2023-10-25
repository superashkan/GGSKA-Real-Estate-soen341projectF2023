//https://www.geeksforgeeks.org/how-to-implement-search-and-filtering-in-a-rest-api-with-node-js-and-express-js/
//https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
//https://stackoverflow.com/questions/37991995/passing-a-variable-from-node-js-to-html
//https://stackoverflow.com/questions/22952044/loop-through-json-in-ejs
//https://stackoverflow.com/questions/74686480/how-to-filter-id-string-contains-substring

const express = require('express')
const application = express();
const mysql_connector = require('mysql');
const body_parser = require('body-parser');
const path = require('path');
const ejs = require('ejs')
var propertyList = require('./propertyList');

application.engine('html', ejs.renderFile);
application.use(body_parser.json());
application.use(body_parser.urlencoded(
  {
    extended: true
  }
));

application.use(express.static('./'));

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

application.get("/", function(request, result) {
    result.render(__dirname + "/index.ejs", {propertyList: propertyList, hasSearchBeenDone: false, locationInput: null, maxPriceInput: null, minPriceInput: null, bedroomsInput: "default", bathroomsInput: "default"});
});

application.listen(3000, function() {
    console.log("To open this application, type 'localhost:3000' into your browser's search bar.");
});

function isNullOrEmpty(stringInput) {
  if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
    return true;
  } else {
    return false;
  }
}

application.get('/search-properties', function(request, result) {
  try {
    var results = "[No Results]";
    if (isNullOrEmpty(request.query.location)) {
      if (isNullOrEmpty(request.query.min_price)) {
        if (isNullOrEmpty(request.query.max_price)) {
          if (isNullOrEmpty(request.query.beds)) {
            if (isNullOrEmpty(request.query.baths)) {
              throw new Error("Error: At least 1 search parameter must be inputted.");
            }
          }
        }
      }
    }
    var location = (isNullOrEmpty(request.query.location) ? null : request.query.location);
    var min_price = (isNullOrEmpty(request.query.min_price) ? null : request.query.min_price);
    var max_price = (isNullOrEmpty(request.query.max_price) ? null : request.query.max_price);
    var bedrooms = ((isNullOrEmpty(request.query.beds) || request.query.beds == "noselection") ? null : request.query.beds);
    var bathrooms = ((isNullOrEmpty(request.query.baths) || request.query.baths == "noselection") ? null : request.query.baths);
    var searchedProperties = propertyList;
    if (!isNullOrEmpty(location)) {
      searchedProperties = searchedProperties.filter(function(property) {
        return property.address.toLowerCase().includes(location.toLowerCase());
      });
    }
    if (!isNullOrEmpty(max_price)) {
      searchedProperties = searchedProperties.filter(function(property) {
        return property.going_price <= max_price;
      });
    }
    if (!isNullOrEmpty(min_price)) {
      searchedProperties = searchedProperties.filter(function(property) {
        return property.going_price >= min_price;
      });
    }
    if (!isNullOrEmpty(bedrooms)) {
      searchedProperties = searchedProperties.filter(function(property) {
        return property.num_bedrooms == bedrooms;
      });
    }
    if (!isNullOrEmpty(bathrooms)) {
      searchedProperties = searchedProperties.filter(function(property) {
        return property.num_bathrooms == bathrooms;
      });
    }
    result.render(__dirname + "/index.ejs", {propertyList: searchedProperties, hasSearchBeenDone: true, locationInput: location, maxPriceInput: max_price, minPriceInput: min_price, bedroomsInput: bedrooms, bathroomsInput: bathrooms});
  }
  catch(error) {
    result.send(error.message);
  }
});
