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

module.exports = connection;
