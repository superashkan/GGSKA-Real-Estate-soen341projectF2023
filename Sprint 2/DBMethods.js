//https://www.w3schools.com/sql/sql_autoincrement.asp
//https://www.w3schools.com/nodejs/shownodejs_cmd.asp?filename=demo_db_select
//https://w3schools.com/nodejs/nodejs_mysql_select.asp
//https://www.w3schools.com/nodejs/shownodejs_cmd.asp?filename=demo_db_connection
//https://www.geeksforgeeks.org/linking-of-mysql-database-in-node-js-backend-side/
//https://www.w3schools.com/js/js_regexp.asp
//https://www.w3schools.com/js/js_errors.asp
//https://stackoverflow.com/questions/40403909/how-to-require-a-class-in-node-js

var Property = require('./Property.js');

var requiredConnectionParam = require("mysql");

var connection = requiredConnectionParam.createConnection({
  host: "localhost",
  user: "root",
  password: "KnowTheName3472!",
  database: "real_estate"
});

connection.connect(function(error) {
  if (error) throw error;
  console.log("Connection successful");
});

var datePattern = /[0-9][0-9][0-9][0-9]\u002D[0-9][0-9]\u002D[0-9][0-9]/;
var timePattern = /[0-9][0-9]\u003A[0-9][0-9]\u003A[0-9][0-9]/;

function isNullOrEmpty(stringInput) {
  if (stringInput === null || stringInput.toString().trim() === "") {
    return true;
  } else {
    return false;
  }
}

//For the Homebuyer table:

function insertHomebuyer(firstName, lastName, username, password) {
  try {
    if (isNullOrEmpty(firstName) || firstName.length > 100) {
      throw new Error("Error (Homebuyer Insertion): A valid, non-null first name that is no longer than 100 characters must be provided.");
    }
    if (isNullOrEmpty(lastName) || lastName.length > 100) {
      throw new Error("Error (Homebuyer Insertion): A valid, non-null last name that is no longer than 100 characters must be provided.");
    }
    if (isNullOrEmpty(username) || username.length > 50) {
      throw new Error("Error (Homebuyer Insertion): A valid, non-null username that is no longer than 50 characters must be provided.");
    }
    if (isNullOrEmpty(password) || password.length > 50) {
      throw new Error("Error (Homebuyer Insertion): A valid, non-null password that is no longer than 50 characters must be provided.");
    }
    const insertQuery = `INSERT INTO Homebuyers (FirstName, LastName, BuyerUsername, BuyerPassword) VALUES ('${firstName}', '${lastName}', '${username}', '${password}')`;
    connection.query(insertQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        console.log(`Error (Homebuyer Insertion): A homebuyer with the username ${username} already exists.`)
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function getAllHomebuyerInformation() {
  try {
    const getAllQuery = 'SELECT BuyerID, FirstName, LastName, BuyerUsername, BuyerPassword FROM Homebuyers';
    connection.query(getAllQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
        console.log(result);
      }
      catch(error) {
        console.log(`Error (Homebuyer Information): Unable to retrieve homebuyer information.`);
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:
// insertHomebuyer("James", "Marsh", "jamesmarsh83", "CowboysFan747");
// insertHomebuyer("James", "Donovan", "jdonovan87", "MrHighScore887");
// insertHomebuyer("Nathan", "Donovan", "nathan_donovan", "MyBrotherIsTheBest");
// insertHomebuyer("Helen", "Marsh", "jamesmarsh83", "DoesMyBrotherHaveAnAccount?");
// getAllHomebuyerInformation();


//For the PropertyRenters table:

function insertPropertyRenter(firstName, lastName, username, password) {
  try {
    if (isNullOrEmpty(firstName) || firstName.length > 100) {
      throw new Error("Error (Property Renter Insertion): A valid, non-null first name that is no longer than 100 characters must be provided.");
    }
    if (isNullOrEmpty(lastName) || lastName.length > 100) {
      throw new Error("Error (Property Renter Insertion): A valid, non-null last name that is no longer than 100 characters must be provided.");
    }
    if (isNullOrEmpty(username) || username.length > 50) {
      throw new Error("Error (Property Renter Insertion): A valid, non-null username that is no longer than 50 characters must be provided.");
    }
    if (isNullOrEmpty(password) || password.length > 50) {
      throw new Error("Error (Property Renter Insertion): A valid, non-null password that is no longer than 50 characters must be provided.");
    }
    const insertQuery = `INSERT INTO PropertyRenters (FirstName, LastName, RenterUsername, RenterPassword) VALUES ('${firstName}', '${lastName}', '${username}', '${password}')`;
    connection.query(insertQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        console.log(`Error (Property Renter Insertion): A property renter with the username ${username} already exists.`)
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function getAllRenterInformation() {
  try {
    const getAllQuery = 'SELECT RenterID, FirstName, LastName, RenterUsername, RenterPassword FROM PropertyRenters';
    connection.query(getAllQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
        console.log(result);
      }
      catch(error) {
        console.log(`Error (Property Renter Information): Unable to retrieve property renter information.`);
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:
// insertPropertyRenter("Jimmy", "Pearson", "pearson_jimmy_98", "TheWillIsTheWay");
// insertPropertyRenter("Brianna", "Grant", "briannagrant", "HorsesAndDonuts28");
// insertPropertyRenter("Timmy", "Oleander", "pearson_jimmy_98", "ThisUsernameDoesNotSuitMe");
// getAllRenterInformation();


//For the Brokers table:

function insertBroker(firstName, lastName, username, password) {
  try {
    if (isNullOrEmpty(firstName) || firstName.length > 100) {
      throw new Error("Error (Broker Insertion): A valid, non-null first name that is no longer than 100 characters must be provided.");
    }
    if (isNullOrEmpty(lastName) || lastName.length > 100) {
      throw new Error("Error (Broker Insertion): A valid, non-null last name that is no longer than 100 characters must be provided.");
    }
    if (isNullOrEmpty(username) || username.length > 50) {
      throw new Error("Error (Broker Insertion): A valid, non-null username that is no longer than 50 characters  must be provided.");
    }
    if (isNullOrEmpty(password) || password.length > 50) {
      throw new Error("Error (Broker Insertion): A valid, non-null password that is no longer than 50 characters must be provided.");
    }
    const insertQuery = `INSERT INTO Brokers (FirstName, LastName, BrokerUsername, BrokerPassword) VALUES ('${firstName}', '${lastName}', '${username}', '${password}')`;
    connection.query(insertQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        console.log(`Error (Broker Insertion): A broker with the username ${username} already exists.`)
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function getAllBrokerInformation() {
  try {
    const getAllQuery = 'SELECT BrokerID, FirstName, LastName, BrokerUsername, BrokerPassword FROM Brokers';
    connection.query(getAllQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
        console.log(result);
      }
      catch(error) {
        console.log(`Error (Broker Information): Unable to retrieve broker information.`);
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:
insertBroker("Jeff", "Smith", "jeffsmith91", "BeautifulButterfly32");
insertBroker("Jeff", "Davidson", "jdavidson91", "WallStreetRules247!");
insertBroker("Elaine", "Davidson", "elaine_h_davidson", "MyHusbandIsAmazing");
insertBroker("Peter", "St-Charles", "peterstcharles4249", "R0ck&R011@11D@yL0ng!");
insertBroker("Alana", "Masterson", "jdavidson91", "WhyDidIUseThisUsername?");
// getAllBrokerInformation();


//For the Properties table:

function insertProperty(address, brokerID, goingPrice, amenities, numBedrooms, numBathrooms) {
  try {
    if (isNullOrEmpty(address) || address.length > 255){
      throw new Error("Error (Property Insertion): A valid, non-null address that is no longer than 255 characters must be provided.");
    }
    if (brokerID === null || brokerID <= 0) {
      throw new Error("Error (Property Insertion): A valid, non-null, existing broker ID must be provided.");
    }
    if (isNullOrEmpty(amenities) || amenities.length > 500) {
      throw new Error("Error (Property Insertion): A valid, non-null description of the property's amenities that is no longer than 500 characters must be provided.");
    }
    if (numBedrooms === null || numBedrooms <= 0) {
      throw new Error("Error (Property Insertion): A valid, non-null, positive number of bedrooms must be provided.");
    }
    if (numBathrooms === null || numBathrooms <= 0) {
      throw new Error("Error (Property Insertion): A valid, non-null, positive number of bathrooms must be provided.");
    }
    if (goingPrice === null || goingPrice <= 0.00) {
      throw new Error("Error (Property Insertion): A valid, non-null, positive going price must be provided.");
    }
    const insertQuery = `INSERT INTO Properties (Address, BrokerID, GoingPrice, Amenities, NumBedrooms, NumBathrooms) VALUES ('${address}', ${brokerID}, ${goingPrice}, '${amenities}', ${numBedrooms}, ${numBathrooms})`;
    connection.query(insertQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        if (error.message.includes('Cannot add or update a child row: a foreign key constraint fails')) {
          console.log(`Error (Property Insertion): The provided broker ID of ${brokerID} does not exist in the Brokers table.`)
        }
        else if (error.message.includes('ER_DUP_ENTRY: Duplicate entry')) {
          console.log(`Error (Property Insertion): A property with the address ${address} already exists.`)
        }
        else {
          console.log('Error (Property Insertion): Cannot add property.');
        }
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function getAllPropertyInformation() {
  try {
    const getAllQuery = 'SELECT Address, BrokerID, GoingPrice, Amenities, NumBedrooms, NumBathrooms FROM Properties';
    connection.query(getAllQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
        console.log(result);
      }
      catch(error) {
        console.log(`Error (Property Information): Unable to retrieve property information.`);
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:
insertProperty("342 Melon Street", 1, 2100.00, "Spacious interior, beautiful exterior, fully furnished basement, state-of-the-art shower system, king-sized bedding, and so much more.", 3, 2);
insertProperty("5091 Campbell Avenue", 2, 3000.00, "Spacious & decorated interior, stunning castle-like exterior, modern-day dining room complete with all of the latest kitchen gadgets & even some Renaissance-era paintings, king-sized bedding, and so much more.", 4, 3);
insertProperty("27 Heathrow Lane", 3, 540.00, "Small-medium interior, aged & rusted exterior, dated furnishings & decor, high-quality plumbing, single-person bedding, and so much more.", 1, 2);
insertProperty("67 Merano Boulevard", 4, 1500.00, "Medium-sized interior, apartment, fully furnished, plasma-screen TV, king-sized bedding, reliable fire escape, balcony complete with chairs & a view, and so much more.", 2, 1);
insertProperty("341 Melon Street", 5, 730.00, "This is just a test!", 5, 1);
// getAllPropertyInformation();


//For the HomebuyerVisits table:

function createHomebuyerVisitRequest(buyerID, propertyID, date, time) {
  try {
    if (buyerID === null || buyerID <= 0) {
      throw new Error("Error (Homebuyer Visit Scheduling): A valid, non-null, existing homebuyer ID must be provided.");
    }
    if (propertyID === null || propertyID <= 0) {
      throw new Error("Error (Homebuyer Visit Scheduling): A valid, non-null, existing property ID must be provided.");
    }
    if (isNullOrEmpty(date) || datePattern.test(date) == false) {
      throw new Error("Error (Homebuyer Visit Scheduling): A valid, non-null, future date in 'YYYY-MM-DD' format must be provided.");
    }
    if (isNullOrEmpty(time) || timePattern.test(time) == false) {
      throw new Error("Error (Homebuyer Visit Scheduling): A valid, non-null, future time in 'HH:MM:SS' format must be provided.");
    }
    const insertQuery = `INSERT INTO HomebuyerVisits (BuyerID, PropertyID, VisitDate, VisitTime) VALUES (${buyerID}, ${propertyID}, '${date}', '${time}')`;
    connection.query(insertQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        if (error.message.includes('Cannot add or update a child row: a foreign key constraint fails') && error.message.includes('FOREIGN KEY (`BuyerID`)')) {
          console.log(`Error (Homebuyer Visit Scheduling): The provided homebuyer ID of ${buyerID} does not exist in the Homebuyers table.`)
        }
        else if (error.message.includes('Cannot add or update a child row: a foreign key constraint fails') && error.message.includes('FOREIGN KEY (`PropertyID`)')) {
          console.log(`Error (Homebuyer Visit Scheduling): The provided property ID of ${propertyID} does not exist in the Properties table.`)
        }
        else {
          console.log('Error (Homebuyer Visit Scheduling): Unable to schedule homebuyer visit.');
        }
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function getAllHomebuyerVisitInformation() {
  try {
    const getAllQuery = 'SELECT BuyerID, PropertyID, VisitDate, VisitTime FROM HomebuyerVisits';
    connection.query(getAllQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
        console.log(result);
      }
      catch(error) {
        console.log(error.message);
        console.log(`Error (Homebuyer Visit Information): Unable to retrieve homebuyer visit information.`);
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:
// createHomebuyerVisitRequest(5, 2, '2023-10-10', '18:30:00');
// createHomebuyerVisitRequest(2, 5, '2023-10-10', '18:30:00');
// createHomebuyerVisitRequest(1, 1, '2024-01-01', '18:45:00');
// createHomebuyerVisitRequest(2, 2, '2023-12-03', '17:19:00');
// createHomebuyerVisitRequest(3, 3, '2023-12-24', '14:44:00');
// getAllHomebuyerVisitInformation();


//For the RenterVisits table:

function createRenterVisitRequest(renterID, propertyID, date, time) {
  try {
    if (renterID === null || renterID <= 0) {
      throw new Error("Error (Property Renter Visit Scheduling): A valid, non-null, existing property renter ID must be provided.");
    }
    if (propertyID === null || propertyID <= 0) {
      throw new Error("Error (Property Renter Visit Scheduling): A valid, non-null, existing property ID must be provided.");
    }
    if (isNullOrEmpty(date) || datePattern.test(date) == false) {
      throw new Error("Error (Property Renter Visit Scheduling): A valid, non-null, future date in 'YYYY-MM-DD' format must be provided.");
    }
    if (isNullOrEmpty(time) || timePattern.test(time) == false) {
      throw new Error("Error (Property Renter Visit Scheduling): A valid, non-null, future time in 'HH:MM:SS' format must be provided.");
    }
    const insertQuery = `INSERT INTO RenterVisits (RenterID, PropertyID, VisitDate, VisitTime) VALUES (${renterID}, ${propertyID}, '${date}', '${time}')`;
    connection.query(insertQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        if (error.message.includes('Cannot add or update a child row: a foreign key constraint fails') && error.message.includes('FOREIGN KEY (`RenterID`)')) {
          console.log(`Error (Property Renter Visit Scheduling): The provided property renter ID of ${renterID} does not exist in the PropertyRenters table.`)
        }
        else if (error.message.includes('Cannot add or update a child row: a foreign key constraint fails') && error.message.includes('FOREIGN KEY (`PropertyID`)')) {
          console.log(`Error (Property Renter Visit Scheduling): The provided property ID of ${propertyID} does not exist in the Properties table.`)
        }
        else {
          console.log('Error (Property Renter Visit Scheduling): Unable to schedule property renter visit.');
        }
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function getAllRenterVisitInformation() {
  try {
    const getAllQuery = 'SELECT RenterID, PropertyID, VisitDate, VisitTime FROM RenterVisits';
    connection.query(getAllQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
        console.log(result);
      }
      catch(error) {
        console.log(`Error (Property Renter Visit Information): Unable to retrieve property renter visit information.`);
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:
// createRenterVisitRequest(1, 1, '2023-12-17', '12:45:00');
// createRenterVisitRequest(2, 2, '2023-10-17', '11:18:00');
// createRenterVisitRequest(1, 5, '2023-12-17', '12:45:00');
// createRenterVisitRequest(5, 1, '2023-12-17', '12:45:00');
// getAllRenterVisitInformation();


//For the BrokerVisits table:

function createBrokerVisitRequest(brokerID, propertyID, date, time) {
  try {
    if (brokerID === null || brokerID <= 0) {
      throw new Error("Error (Broker Visit Scheduling): A valid, non-null, existing broker ID must be provided.");
    }
    if (propertyID === null || propertyID <= 0) {
      throw new Error("Error (Broker Visit Scheduling): A valid, non-null, existing property ID must be provided.");
    }
    if (isNullOrEmpty(date) || datePattern.test(date) == false) {
      throw new Error("Error (Broker Visit Scheduling): A valid, non-null, future date in 'YYYY-MM-DD' format must be provided.");
    }
    if (isNullOrEmpty(time) || timePattern.test(time) == false) {
      throw new Error("Error (Broker Visit Scheduling): A valid, non-null, future time in 'HH:MM:SS' format must be provided.");
    }
    const insertQuery = `INSERT INTO BrokerVisits (BrokerID, PropertyID, VisitDate, VisitTime) VALUES (${brokerID}, ${propertyID}, '${date}', '${time}')`;
    connection.query(insertQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        if (error.message.includes('Cannot add or update a child row: a foreign key constraint fails') && error.message.includes('FOREIGN KEY (`BrokerID`)')) {
          console.log(`Error (Broker Visit Scheduling): The provided broker ID of ${brokerID} does not exist in the Brokers table.`)
        }
        else if (error.message.includes('Cannot add or update a child row: a foreign key constraint fails') && error.message.includes('FOREIGN KEY (`PropertyID`)')) {
          console.log(`Error (Broker Visit Scheduling): The provided property ID of ${propertyID} does not exist in the Properties table.`)
        }
        else {
          console.log('Error (Broker Visit Scheduling): Unable to schedule broker visit.');
        }
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function getAllBrokerVisitInformation() {
  try {
    const getAllQuery = 'SELECT BrokerID, PropertyID, VisitDate, VisitTime FROM BrokerVisits';
    connection.query(getAllQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
        console.log(result);
      }
      catch(error) {
        console.log(error.message);
        console.log(`Error (Broker Visit Information): Unable to retrieve broker visit information.`);
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:
// createBrokerVisitRequest(2, 5, '2023-11-29', '16:42:00');
// createBrokerVisitRequest(5, 2, '2023-12-14', '17:29:00');
// createBrokerVisitRequest(1, 1, '2023-12-14', '17:29:00');
// createBrokerVisitRequest(2, 2, '2023-11-14', '17:47:00');
// createBrokerVisitRequest(3, 3, '2023-10-25', '09:53:00');
// createBrokerVisitRequest(4, 4, '2023-12-27', '08:43:00');
// getAllBrokerVisitInformation();



//Update and delete:

//Properties:

function updateProperty(propertyID, newAddress, newBrokerID, newGoingPrice, newAmenities, newNumBedrooms, newNumBathrooms) {
  try {
    if (isNullOrEmpty(newAddress) || newAddress.length > 255) {
      throw new Error("Error (Property Update): A valid, non-null address that is no longer than 255 characters must be provided.");
    }
    if (newBrokerID === null || newBrokerID <= 0) {
      throw new Error("Error (Property Update): A valid, non-null, existing broker ID must be provided.");
    }
    if (newGoingPrice === null || newGoingPrice <= 0) {
      throw new Error("Error (Property Update): A valid, non-null, positive going price must be provided.");
    }
    if (isNullOrEmpty(newAmenities) || newAmenities.length > 500) {
      throw new Error("Error (Property Update): A valid, non-null description of the property's amenities that is no longer than 500 characters must be provided.");
    }
    if (newNumBedrooms === null || newNumBedrooms <= 0) {
      throw new Error("Error (Property Update): A valid, non-null, positive number of bedrooms must be provided.");
    }
    if (newNumBathrooms === null || newNumBathrooms <= 0) {
      throw new Error("Error (Property Update): A valid, non-null, positive number of bathrooms must be provided.");
    }
    const updateQuery = `UPDATE Properties SET Address = '${newAddress}', BrokerID = ${newBrokerID}, GoingPrice = ${newGoingPrice}, Amenities = '${newAmenities}', NumBedrooms = ${newNumBedrooms}, NumBathrooms = ${newNumBathrooms} WHERE PropertyID = ${propertyID}`;
    connection.query(updateQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        console.log(`Error (Property Update): A property with the address ${newAddress} already exists.`)
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function deleteProperty(propertyID) {
  try {
    const deleteBrokerVisitQuery = `DELETE FROM BrokerVisits WHERE PropertyID = ${propertyID}`
    connection.query(deleteBrokerVisitQuery, function (error, result) {
      if (error) {
        throw error;
      }
    });
    const deleteRenterVisitQuery = `DELETE FROM RenterVisits WHERE PropertyID = ${propertyID}`
    connection.query(deleteRenterVisitQuery, function (error, result) {
      if (error) {
        throw error;
      }
    });
    const deleteHomebuyerVisitQuery = `DELETE FROM HomebuyerVisits WHERE PropertyID = ${propertyID}`
    connection.query(deleteHomebuyerVisitQuery, function (error, result) {
      if (error) {
        throw error;
      }
    });
    const deleteQuery = `DELETE FROM Properties WHERE PropertyID = ${propertyID}`;
    connection.query(deleteQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        if (error.message.includes('Cannot delete or update a parent row: a foreign key constraint fails') && error.message.includes('FOREIGN KEY (`PropertyID`)')) {
          console.log(`Error (Property Deletion): The property with the ID of ${propertyID} is being referenced by another entry in the database, and thus cannot be deleted.`);
        }
        else {
          console.log(`Error (Property Deletion): The property deletion for property ID ${propertyID} failed.`);
        }
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:

// updateProperty(1, "597 Theodoria Street", 2, 2400.00, "Spacious interior, beautiful exterior, fully furnished basement, state-of-the-art shower system, king-sized bedding, and so much more.", 3, 2);
// updateProperty(1, "5091 Campbell Avenue", 2, 2400.00, "Spacious interior, beautiful exterior, fully furnished basement, state-of-the-art shower system, king-sized bedding, and so much more.", 3, 3);
// updateProperty(5, "5091 Campbell Avenue", 2, 2400.00, "Spacious interior, beautiful exterior, fully furnished basement, state-of-the-art shower system, king-sized bedding, and so much more.", 3, 2);
// updateProperty(5, "597 Theodoria Street", 2, 2400.00, "Spacious interior, beautiful exterior, fully furnished basement, state-of-the-art shower system, king-sized bedding, and so much more.", 3, 1);
// deleteProperty(2);
// deleteProperty(3);
// deleteProperty(6);


//Brokers:

function updateBroker(brokerID, newFirstName, newLastName, newUsername, newPassword) {
  try {
    if (isNullOrEmpty(newFirstName) || newFirstName.length > 100) {
      throw new Error("Error (Broker Update): A valid, non-null first name that is no longer than 100 characters must be provided.");
    }
    if (isNullOrEmpty(newLastName) || newLastName.length > 100) {
      throw new Error("Error (Broker Update): A valid, non-null last name that is no longer than 100 characters must be provided.");
    }
    if (isNullOrEmpty(newUsername) || newUsername.length > 50) {
      throw new Error("Error (Broker Update): A valid, non-null username that is no longer than 50 characters must be provided.");
    }
    if (isNullOrEmpty(newPassword) || newPassword.length > 50) {
      throw new Error("Error (Broker Update): A valid, non-null password that is no longer than 50 characters must be provided.");
    }
    const updateQuery = `UPDATE Brokers SET FirstName = '${newFirstName}', LastName = '${newLastName}', BrokerUsername = '${newUsername}', BrokerPassword = '${newPassword}' WHERE BrokerID = ${brokerID}`;
    connection.query(updateQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        console.log(`Error (Broker Update): A broker with the username ${newUsername} already exists.`)
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

function deleteBroker(brokerID) {
  try {
    const deleteBrokerVisitQuery1 = `DELETE FROM BrokerVisits WHERE PropertyID = (SELECT PropertyID FROM Properties WHERE BrokerID = ${brokerID})`
    connection.query(deleteBrokerVisitQuery1, function (error, result) {
      if (error) {
        throw error;
      }
    });
    const deleteBrokerVisitQuery2 = `DELETE FROM BrokerVisits WHERE BrokerID = ${brokerID}`
    connection.query(deleteBrokerVisitQuery2, function (error, result) {
      if (error) {
        throw error;
      }
    });
    const deleteRenterVisitQuery = `DELETE FROM RenterVisits WHERE PropertyID = (SELECT PropertyID FROM Properties WHERE BrokerID = ${brokerID})`
    connection.query(deleteRenterVisitQuery, function (error, result) {
      if (error) {
        throw error;
      }
    });
    const deleteHomebuyerVisitQuery = `DELETE FROM HomebuyerVisits WHERE PropertyID = (SELECT PropertyID FROM Properties WHERE BrokerID = ${brokerID})`
    connection.query(deleteHomebuyerVisitQuery, function (error, result) {
      if (error) {
        throw error;
      }
    });
    const deletePropertyQuery = `DELETE FROM Properties WHERE BrokerID = ${brokerID}`
    connection.query(deletePropertyQuery, function (error, result) {
      if (error) {
        throw error;
      }
    });
    const deleteQuery = `DELETE FROM Brokers WHERE BrokerID = ${brokerID}`;
    connection.query(deleteQuery, function (error, result) {
      try {
        if (error) {
          throw error;
        }
      }
      catch(error) {
        if (error.message.includes('Cannot delete or update a parent row: a foreign key constraint fails') && error.message.includes('FOREIGN KEY (`BrokerID`)')) {
          console.log(`Error (Broker Deletion): The broker with the ID of ${brokerID} is being referenced by another entry in the database, and thus cannot be deleted.`);
        }
        else {
          console.log(`Error (Broker Deletion): The broker deletion for broker ID ${propertyID} failed.`);
        }
      }
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//For testing purposes:

// updateBroker(3, "Elaine", "Michaels", "jdavidson91", "MyNewHusbandIsAwesome");
// updateBroker(3, "Elaine", "Michaels", "elaine_h_michaels", "MyNewHusbandIsAwesome");
// updateBroker(5, "Elaine", "Michaels", "jdavidson91", "MyNewHusbandIsAwesome");
// updateBroker(5, "Elaine", "Michaels", "elaine_h_michaels", "MyNewHusbandIsAwesome");
//deleteBroker(1);
// deleteBroker(6);


//Search method:

async function searchProperties(addressQuery, brokerNameQuery, maxGoingPriceQuery, minGoingPriceQuery, amenitiesQuery, numBedroomsQuery, numBathroomsQuery) {
  try {
    if (isNullOrEmpty(numBathroomsQuery) && ((isNullOrEmpty(addressQuery) && (isNullOrEmpty(brokerNameQuery) && isNullOrEmpty(maxGoingPriceQuery))) && (isNullOrEmpty(minGoingPriceQuery) && (isNullOrEmpty(amenitiesQuery) && isNullOrEmpty(numBedroomsQuery))))) {
      throw new Error("Error (Property Search): All fields are either null or empty. Please enter a valid value for at least one search criteria field");
    }
    var searchQuery = `SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties INNER JOIN Brokers ON Properties.BrokerID = Brokers.BrokerID`;
    var rowDataPacketList = [];
    var resultsList = [];
    var brokerName = "";
    if (!isNullOrEmpty(addressQuery)) {
      if (searchQuery === `SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties INNER JOIN Brokers ON Properties.BrokerID = Brokers.BrokerID`) {
        searchQuery = searchQuery.concat(` WHERE `);
      } else {
        searchQuery = searchQuery.concat(` AND `);
      }
      searchQuery = searchQuery.concat(`Properties.Address LIKE '%${addressQuery}%'`);
    }
    if (!isNullOrEmpty(brokerNameQuery)) {
      if (searchQuery === `SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties INNER JOIN Brokers ON Properties.BrokerID = Brokers.BrokerID`) {
        searchQuery = searchQuery.concat(` WHERE `);
      } else {
        searchQuery = searchQuery.concat(` AND `);
      }
      searchQuery = searchQuery.concat(`Properties.BrokerID IN (SELECT BrokerID FROM Brokers WHERE FirstName LIKE '%${brokerNameQuery}%' OR LastName LIKE '%${brokerNameQuery}%')`);
    }
    if (!isNullOrEmpty(maxGoingPriceQuery)) {
      if (searchQuery === `SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties INNER JOIN Brokers ON Properties.BrokerID = Brokers.BrokerID`) {
        searchQuery = searchQuery.concat(` WHERE `);
      } else {
        searchQuery = searchQuery.concat(` AND `);
      }
      searchQuery = searchQuery.concat(`Properties.GoingPrice <= ${maxGoingPriceQuery}`);
    }
    if (!isNullOrEmpty(minGoingPriceQuery)) {
      if (searchQuery === `SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties INNER JOIN Brokers ON Properties.BrokerID = Brokers.BrokerID`) {
        searchQuery = searchQuery.concat(` WHERE `);
      } else {
        searchQuery = searchQuery.concat(` AND `);
      }
      searchQuery = searchQuery.concat(`Properties.GoingPrice >= ${minGoingPriceQuery}`);
    }
    if (!isNullOrEmpty(amenitiesQuery)) {
      if (searchQuery === `SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties INNER JOIN Brokers ON Properties.BrokerID = Brokers.BrokerID`) {
        searchQuery = searchQuery.concat(` WHERE `);
      } else {
        searchQuery = searchQuery.concat(` AND `);
      }
      searchQuery = searchQuery.concat(`Properties.Amenities LIKE '%${amenitiesQuery}%'`);
    }
    if (!isNullOrEmpty(numBedroomsQuery)) {
      if (searchQuery === `SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties INNER JOIN Brokers ON Properties.BrokerID = Brokers.BrokerID`) {
        searchQuery = searchQuery.concat(` WHERE `);
      } else {
        searchQuery = searchQuery.concat(` AND `);
      }
      searchQuery = searchQuery.concat(`Properties.NumBedrooms = ${numBedroomsQuery}`);
    }
    if (!isNullOrEmpty(numBathroomsQuery)) {
      if (searchQuery === `SELECT Properties.*, CONCAT(Brokers.FirstName, ' ', Brokers.LastName) AS BrokerFullName FROM Properties`) {
        searchQuery = searchQuery.concat(` WHERE `);
      } else {
        searchQuery = searchQuery.concat(` AND `);
      }
      searchQuery = searchQuery.concat(`Properties.NumBathrooms = ${numBathroomsQuery}`);
    }
    //https://stackoverflow.com/questions/47158979/node-wait-for-async-function-before-continue
    return new Promise(function(resolve, reject) {
      console.log(searchQuery);
      connection.query(searchQuery, function (error, result) {
        if (error) throw error;

        //https://stackoverflow.com/questions/31221980/how-to-access-a-rowdatapacket-object
        result = JSON.parse(JSON.stringify(result));
        console.log(result);
        for (property of result) {
          var newProperty = new Property(property['PropertyID'], property['BrokerID'], property['BrokerFullName'], property['Address'], property['GoingPrice'], property['Amenities'], property['NumBedrooms'], property['NumBathrooms']);
          resultsList.push(newProperty);
        }
        resolve(resultsList);
      });
    });
  }
  catch(error) {
    console.log(error.message);
  }
}

//https://stackoverflow.com/questions/47158979/node-wait-for-async-function-before-continue
async function getResults(addressQuery, brokerNameQuery, maxGoingPriceQuery, minGoingPriceQuery, amenitiesQuery, numBedroomsQuery, numBathroomsQuery) {
  var results = await searchProperties(addressQuery, brokerNameQuery, maxGoingPriceQuery, minGoingPriceQuery, amenitiesQuery, numBedroomsQuery, numBathroomsQuery);
  console.log(results);
}

//For testing purposes:

getResults("", "", null, 0.00, "", null, null);
connection.end();

module.exports = getResults;
