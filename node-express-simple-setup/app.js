//load app server with express
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use(morgan('short'));

function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'world'
  });
}

app.get('/', (req, res) => {
  console.log('Responding to root route');
  res.send("Hello from roooot");
});

app.get('/users', (req, res) => {
  var users1 = {
    firstName: "Stephen",
    lastName: "Curry"
  }
  const user2 = {
    firstName: "Kevin",
    lastName: "Durant"
  }
  res.send([users1, user2]);
  console.log('Responding to users route');
});

app.get('/cities', (req, res) => {
  console.log('Fecthing all cities');
  const queryString = "SELECT * FROM city"
  getConnection().query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('A db error occurred: ' + err);
      res.sendStatus(500);
      return;
      //throw err;
    }
    if (rows) {
      console.log("I think we fetched cities successfully");
      const cities = rows.map((row) => {
        return { name: row.Name, district: row.District, population: row.Population }
      });
      res.json(cities);
    }
    else
      console.log("db returned empty array");
  });

  //res.end();
});

app.get('/city/:id', (req, res) => {
  console.log('Fecthing city with id: ' + req.params.id);
  const cityID = req.params.id;
  const queryString = "SELECT * FROM city WHERE ID = ?"
  getConnection().query(queryString, [cityID], (err, rows, fields) => {
    if (err) {
      console.log('A db error occurred: ' + err);
      res.sendStatus(500);
      return;
      //throw err;
    }
    if (rows) {
      console.log("I think we fetched city successfully");
      const cities = rows.map((row) => {
        return { name: row.Name, district: row.District, population: row.Population }
      });
      res.json(cities);
    }
    else
      console.log("db returned empty array");
  });

  //res.end();
});

app.post('/city_create', (req, res) => {
  console.log("Trying to create new city...")
  const name = req.body.create_name;
  const district = req.body.create_district;
  const population = req.body.create_population;
  const queryString = "INSERT INTO city (Name, District, Population, CountryCode) VALUES (?,?,?,'PAK')";

  getConnection().query(queryString, [name, district, population], (err, rows, fields) => {
    console.log(name, district, population);
    if (err) {
      console.log('A db error occurred: ' + err);
      res.sendStatus(500);
      return;
      //throw err;
    }
    if (rows)
      console.log("Inserted a new City with Id: ", rows.insertedId);
    else
      console.log("db returned empty array");
  });

  res.end();
});

//localhost:3003
app.listen(3003, () => {
  console.log('Server is listening at 3003...');
});
