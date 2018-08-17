//load app server with express
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cityRouter = require('./routes/city.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use(morgan('short'));
app.use(cityRouter);

app.get('/', (req, res) => {
  console.log('Responding to root route');
  res.send("Hello from roooot");
});

const PORT = process.env.PORT || 3003
//localhost:PORT
app.listen(PORT, () => {
  console.log('Server is listening on: ', PORT);
});
