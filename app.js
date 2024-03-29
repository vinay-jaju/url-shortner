const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/url-shortner";
const connectOptions = { 
  keepAlive: true, 
  reconnectTries: Number.MAX_VALUE 
}; 
//Connect to MongoDB 
mongoose.Promise = global.Promise; 
mongoose.connect(mongoURI, connectOptions, (err, db) => 
{ 
  if (err) console.log(`Error`, err); 
  console.log(`Connected to MongoDB`); 
}); 
require('./models/UrlShorten');
const app = express(); 
app.use(bodyParser.json());
const PORT = 7000; 
app.use(require("./routes/urlshorten"));

app.listen(PORT);