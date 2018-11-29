/* server.js implements the server for Pinder
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');

var dbo;
var peopleList;

MongoClient.connect(`mongodb://clammintroopweb:${process.env.MONGO_PASSWORD}@ds033056.mlab.com:33056/pinder-web-app`, function (err, client) {
  if (err) throw err
  
  dbo = client.db('pinder-web-app')

  dbo.collection('dogs').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
  });
  app.listen(app.get('port'), function() { console.log('Server started: http://localhost:' + app.get('port') + '/'); });
});

app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/newPet', function (req, res) {
  dbo.collection('dogs').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
  });

  var id = peopleList.length + 1;
  var loginID = req.body.loginID;
  var Name = req.body.Name;
  var Gender = req.body.Gender;
  var Breed = req.body.Breed;
  var EnergyLevel = req.body.EnergyLevel;
  var HouseTrained = req.body.HouseTrained;
  var Size = req.body.Size;
  var Image = req.body.Image;
  var collection = dbo.collection('dogs');
  console.log(loginID);

  collection.insertOne({
      id: id,
      ownerID: loginID, 
      Name: Name, 
      Gender: Gender, 
      Breed: Breed,
      EnergyLevel: EnergyLevel, 
      HouseTrained: HouseTrained, 
      Size: Size,
      Image: Image
  });
});

app.get('/adoptaPet', function (req, res) {
  dbo.collection('dogs').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
    res.json(result);
  });
});

app.post('/login', function (req, res) {
  var username = req.body.Username;
  var password = req.body.Password;
  dbo.collection('users').find({"email":username,"password":password}).toArray(function (err, result) {
    if (result.length > 0) { 
      res.send(result);
    } else {
      res.send({"Result":"Failure"});
    }    
  });
});

app.post('/itsamatch', function (req, res) {
  var ownerID = req.body.ownerID;
  var dogID = req.body.dogID;

  dbo.collection('matches').insertOne({
    dogID: ownerID,
    ownerID: dogID
  });
});

app.post('/profile', function (req, res) {
  var ownerID = req.body.ownerID;
  console.log("Profile: " + ownerID);

  dbo.collection('users').find({"loginID":ownerID}).toArray(function (err, result) {
    console.log(result);
    if (result.length > 0) { 
      res.send(result);
    } else {
     res.send({"Result":"Failure"});
    }    
  });
});

// app.post('/getOwnerID', function (req, res) {
//   var username = req.body.Email;
//   dbo.collection('users').find({"email":username}).toArray(function (err, result) {
//     console.log("HIPPOS: "+result.length);
//     if (result.length > 1) 
//     {
//       res.json({"ownerID":result.loginID});
//     } else 
//     {
//       res.json({"ownerID":"Failure"});
//     }    
//   })
// });

// app.post('/adoptaPet', function (req, res) {
//   dbo.collection('homework3').find().toArray(function (err, result) {
//     if (err) throw err
//       peopleList = result;
//   })

//   var id = peopleList.length + 1;
//   var firstname = req.body.firstname;
//   var lastname = req.body.lastname;
//   var start = req.body.start;
//   var collection = dbo.collection('homework3');

//     collection.insertOne
//     ({id: id, firstname: firstname, lastname: lastname, start: start});

//     dbo.collection('homework3').find().toArray(function (err, result) {
//     if (err) throw err
//       peopleList = result;
//       //console.log(result);
//       res.json(peopleList);
//   })
// });

// app.get('/person/:id', function (req, res) {
//   dbo.collection('homework3').find().toArray(function (err, result) {
//     if (err) throw err
//       peopleList = result;
//   })
//   var pindex = Person(req.params.id);
//   if (pindex != "404 Not found")
//   {
//     res.json(pindex);
//   }
//   else 
//   {
//     res.send("404 Not found");
//   }
// });

app.all("*", (req, res) => {
  res.sendStatus( 404 );
});
