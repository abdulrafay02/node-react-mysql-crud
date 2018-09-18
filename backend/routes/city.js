//will contain all city related routes
const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "insert_username_here",
  password: "insert_password_here",
  database: "insert_db_name_here"
});

function getConnection() {
  return pool;
}

router.get("/cities", (req, res) => {
  console.log("Fecthing all cities");
  const queryString = "SELECT * FROM city";
  getConnection().query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("A db error occurred: " + err);
      res.sendStatus(500);
      return;
      //throw err;
    }
    if (rows) {
      console.log("I think we fetched cities successfully");
      const cities = rows.map(row => {
        return {
          name: row.Name,
          district: row.District,
          population: row.Population
        };
      });
      res.json(cities);
    } else console.log("db returned empty array!");
  });

  //res.end();
});

router.get("/city/:id", (req, res) => {
  console.log("Fecthing city with id: " + req.params.id);
  const cityID = req.params.id;
  const queryString = "SELECT * FROM city WHERE ID = ?";
  getConnection().query(queryString, [cityID], (err, rows, fields) => {
    if (err) {
      console.log("A db error occurred: " + err);
      res.sendStatus(500);
      return;
      //throw err;
    }
    if (rows) {
      console.log("I think we fetched city successfully");
      const cities = rows.map(row => {
        return {
          name: row.Name,
          district: row.District,
          population: row.Population
        };
      });
      res.json(cities);
    } else console.log("db returned empty array!");
  });

  //res.end();
});

router.post("/city_create", (req, res) => {
  console.log("Trying to create new city...");
  const { create_name, create_district, create_population } = req.body;
  debugger;
  const queryString =
    "INSERT INTO city (Name, District, Population, CountryCode) VALUES (?,?,?,'PAK')";

  getConnection().query(
    queryString,
    [create_name, create_district, create_population],
    (err, rows, fields) => {
      console.log(create_name, create_district, create_population);
      if (err) {
        console.log("A db error occurred:" + err);
        res.sendStatus(500);
        return;
        //throw err;
      }
      console.log("Inserted a new City with Id: ", rows.insertId);
    }
  );

  res.end();
});

module.exports = router;
