//https://www.w3schools.com/sql/sql_autoincrement.asp
//https://www.w3schools.com/nodejs/shownodejs_cmd.asp?filename=demo_db_select
//https://w3schools.com/nodejs/nodejs_mysql_select.asp
//https://www.w3schools.com/nodejs/shownodejs_cmd.asp?filename=demo_db_connection
//https://www.geeksforgeeks.org/linking-of-mysql-database-in-node-js-backend-side/

const requiredConnectionParam = require("mysql");

const connection = requiredConnectionParam.createConnection({
  host: "localhost",
  user: "root",
  password: "KnowTheName3472!",
  database: "real_estate"
});

connection.connect(function(error) {
  if (error) throw error;
  console.log("The connection was successful");
});

//Drop the HomebuyerVisits table.
homebuyerVisitTableDropQuery = "DROP TABLE IF EXISTS HomebuyerVisits";
connection.query(homebuyerVisitTableDropQuery, function (error, result) {
       if (error) throw error;
       console.log("The BuyerVisits table has been droppped.");
});

//Drop the RenterVisits table.
renterVisitTableDropQuery = "DROP TABLE IF EXISTS RenterVisits";
connection.query(renterVisitTableDropQuery, function (error, result) {
       if (error) throw error;
       console.log("The RenterVisits table has been droppped.");
});

//Drop the BrokerVisits table.
brokerVisitTableDropQuery = "DROP TABLE IF EXISTS BrokerVisits";
connection.query(brokerVisitTableDropQuery, function (error, result) {
       if (error) throw error;
       console.log("The BrokerVisits table has been droppped.");
});

//Drop the Properties table.
propertyTableDropQuery = "DROP TABLE IF EXISTS Properties";
connection.query(propertyTableDropQuery, function (error, result) {
       if (error) throw error;
       console.log("The Properties table has been droppped.");
});

//Drop the Homebuyers table.
homebuyerTableDropQuery = "DROP TABLE IF EXISTS Homebuyers";
connection.query(homebuyerTableDropQuery, function (error, result) {
       if (error) throw error;
       console.log("The Homebuyers table has been droppped.");
});

//Drop the PropertyRenters table.
renterTableDropQuery = "DROP TABLE IF EXISTS PropertyRenters";
connection.query(renterTableDropQuery, function (error, result) {
       if (error) throw error;
       console.log("The PropertyRenters table has been droppped.");
});

//Drop the Brokers table.
brokerTableDropQuery = "DROP TABLE IF EXISTS Brokers";
connection.query(brokerTableDropQuery, function (error, result) {
       if (error) throw error;
       console.log("The Brokers table has been droppped.");
});

//Create the Homebuyers table.
homebuyerTableCreateQuery = "CREATE TABLE IF NOT EXISTS Homebuyers (BuyerID int NOT NULL AUTO_INCREMENT, FirstName varchar(100) NOT NULL, LastName varchar(100) NOT NULL, BuyerUsername varchar(50) NOT NULL UNIQUE, BuyerPassword varchar(50) NOT NULL, PRIMARY KEY (BuyerID) )"
connection.query(homebuyerTableCreateQuery, function (error, result) {
       if (error) throw error;
       console.log("The Homebuyers table has been created.");
});

//Create the PropertyRenters table.
renterTableCreateQuery = "CREATE TABLE IF NOT EXISTS PropertyRenters (RenterID int NOT NULL AUTO_INCREMENT, FirstName varchar(100) NOT NULL, LastName varchar(100) NOT NULL, RenterUsername varchar(50) NOT NULL UNIQUE, RenterPassword varchar(50) NOT NULL, PRIMARY KEY (RenterID) )"
connection.query(renterTableCreateQuery, function (error, result) {
       if (error) throw error;
       console.log("The PropertyRenters table has been created.");
});

//Create the Brokers table.
brokerTableCreateQuery = "CREATE TABLE IF NOT EXISTS Brokers (BrokerID int NOT NULL AUTO_INCREMENT, FirstName varchar(100) NOT NULL, LastName varchar(100) NOT NULL, BrokerUsername varchar(50) NOT NULL UNIQUE, BrokerPassword varchar(50) NOT NULL, PRIMARY KEY (BrokerID) )"
connection.query(brokerTableCreateQuery, function (error, result) {
       if (error) throw error;
       console.log("The Brokers table has been created.");
});

//Create the Properties table.
propertyTableCreateQuery = "CREATE TABLE IF NOT EXISTS Properties (PropertyID int NOT NULL AUTO_INCREMENT, BrokerID int NOT NULL, Address varchar(255) NOT NULL UNIQUE, GoingPrice double NOT NULL, Amenities varchar(500) NOT NULL, NumBedrooms int NOT NULL, PRIMARY KEY (PropertyID), FOREIGN KEY (BrokerID) REFERENCES Brokers(BrokerID) );"
connection.query(propertyTableCreateQuery, function (error, result) {
       if (error) throw error;
       console.log("The Properties table has been created.");
});

//Create the HomebuyerVisits table.
homebuyerVisitTableCreateQuery = "CREATE TABLE IF NOT EXISTS HomebuyerVisits (BuyerVisitID int NOT NULL AUTO_INCREMENT, BuyerID int NOT NULL, PropertyID int NOT NULL, VisitDate DATE, VisitTime TIME, PRIMARY KEY (BuyerVisitID), FOREIGN KEY (BuyerID) REFERENCES Homebuyers(BuyerID), FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID) )";
connection.query(homebuyerVisitTableCreateQuery, function (error, result) {
       if (error) throw error;
       console.log("The BuyerVisits table has been created.");
});

//Create the RenterVisits table.
renterVisitTableCreateQuery = "CREATE TABLE IF NOT EXISTS RenterVisits (RenterVisitID int NOT NULL AUTO_INCREMENT, RenterID int NOT NULL, PropertyID int NOT NULL, VisitDate DATE, VisitTime TIME, PRIMARY KEY (RenterVisitID), FOREIGN KEY (RenterID) REFERENCES PropertyRenters(RenterID), FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID) )";
connection.query(renterVisitTableCreateQuery, function (error, result) {
       if (error) throw error;
       console.log("The RenterVisits table has been created.");
});

//Create the BrokerVisits table.
brokerVisitTableCreateQuery = "CREATE TABLE IF NOT EXISTS BrokerVisits (BrokerVisitID int NOT NULL AUTO_INCREMENT, BrokerID int NOT NULL, PropertyID int NOT NULL, VisitDate DATE, VisitTime TIME, PRIMARY KEY (BrokerVisitID), FOREIGN KEY (BrokerID) REFERENCES Brokers(BrokerID), FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID) )";
connection.query(brokerVisitTableCreateQuery, function (error, result) {
       if (error) throw error;
       console.log("The BrokerVisits table has been created.");
});

connection.end();
