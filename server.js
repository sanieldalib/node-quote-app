const express = require ("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect("mongodb://dsalib:daniel98@ds125048.mlab.com:25048/dsalib-star-wars", (err, client) => {
  if (err) return console.log(err)
  db = client.db("dsalib-star-wars")
  app.listen(3000, function() {
    console.log("Listening on 3000")
  });
});

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res) => {
  res.sendFile("/Users/danielsalib/Desktop/Learning & Projects/Node Intro" + "/index.html")
});

app.get("/", (req, res) => {
  var cursor = db.collection("quotes").find().toArray(function(err, results){
    console.log(results);
  })
})

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err,result) => {
    if (err) return console.log(err);

    res.redirect("/");
  })
})
