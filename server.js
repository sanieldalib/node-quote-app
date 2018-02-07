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

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
  var cursor = db.collection("quotes").find().toArray((err, results) => {
    if (err) return console.log(err);
    //render index.ejs
    res.render("index.ejs", {quotes: results})
  })
})

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err,result) => {
    if (err) return console.log(err);

    console.log("Saved to DB")
    res.redirect("/");
  })
})

app.put("/quotes", (req, res) => {
  db.collection('quotes').findOneAndUpdate(
  {
    name: 'Jerome'
  },
  {
    $set:
    { name: req.body.name,
      quote: req.body.quote }
  },
  {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    }
)
})

app.delete("/quotes", (req, res) => {
  db.collection("quotes").findOneAndDelete(
    {
      name: req.body.name
    }, (err, results) => {
      if (err) return res.send(500, err)
      res.send({message: 'A quote by Jeffrey was deleted!'})
    }
  )
})
