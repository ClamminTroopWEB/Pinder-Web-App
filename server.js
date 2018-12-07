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
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');

 var matches_list=[];

var dbo;
var peopleList;

MongoClient.connect(`mongodb://clammintroopweb:${process.env.MONGO_PASSWORD}@ds033056.mlab.com:33056/pinder-web-app`, function (err, client) {
  if (err) throw err

  dbo = client.db('pinder-web-app')

  dbo.collection('dogs').find().toArray(function (err, result) {
    if (err) throw err
    peopleList = result;
  });
  app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
  });
});

app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/', function (req, res) {
  dbo.collection('users').find({
    "email": req.body.email,
    "password": req.body.password
  }).toArray(function (err, result) {
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({
        "Result": "Failure"
      });
    }
  });
});

app.post('/create', function (req, res) {
  dbo.collection('users').find({
    "email": req.body.email
  }).toArray(function (err, result) {
    if (err) {
      res.send(err);
    }
    if (result.length != 0) {
      res.send({
        "Result": req.body.email
      });
    } else if (result.length == 0) {
      dbo.collection('users').countDocuments({}, function (error, numOfDocs) {
        dbo.collection('users').insertOne({
          name: req.body.name,
          loginID: numOfDocs + 1,
          password: req.body.password,
          email: req.body.email,
          Address: req.body.location,
          ProfilePicture: req.body.Image,
          matches: [],
        }, function (err, data) {
          if (err) {
            res.sendStatus(400);
          }
          res.send({
            "loginID": numOfDocs + 1
          });
        });
      });
    }
  });
});

app.get('/adopt', function (req, res) {
  dbo.collection('dogs').find().toArray(function (err, result) {
    if (err) throw err
    peopleList = result;
    res.json(result);
  });
});

app.post('/profile', function (req, res) {
  var ownerID = req.body.ownerID;
  console.log("Profile: " + ownerID);

  dbo.collection('users').find({
    "loginID": parseInt(ownerID)
  }).toArray(function (err, result) {
    console.log(result);
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({
        "Result": "Failure"
      });
    }
  });
});

app.post('/saveProfile', function (req, res) {
  var ownerID = req.body.loginID;
  console.log("Profile Saveprofile: " + ownerID);
  var Name = req.body.Name;
  var Email = req.body.Email;
  var Location = req.body.Location;

  dbo.collection('users').updateOne({
    "loginID": parseInt(ownerID)
  }, {
    $set: {
      "name": Name,
      "email": Email,
      "Address": Location
    }
  });
  res.sendStatus(200);
});

app.post('/newPet', function (req, res) {
  dbo.collection('dogs').find().toArray(function (err, result) {
    if (err) throw err;
    dogList = result;
  });
  dbo.collection('dogs').insertOne({
    id: dogList.length + 1,
    ownerID: req.body.loginID,
    Name: req.body.Name,
    Gender: req.body.Gender,
    Breed: req.body.Breed,
    EnergyLevel: req.body.EnergyLevel,
    HouseTrained: req.body.HouseTrained,
    Size: req.body.Size,
    Image: req.body.Image
  });
});

app.put('/itsamatch', function (req, res) {
  dbo.collection('users').updateOne({
    "loginID": parseInt(req.body.loginID)
  }, {
    $addToSet: {
      "matches": req.body.dogID
    }
  });
});

app.post('/matches', function (req, res) {
  dbo.collection('users').find({
    "loginID": parseInt(req.body.loginID)
  }).toArray(function (err, result) {
    if (err) throw err;
      matches = result[0].matches;
      for (var i = 0; i < matches.length; i++)
      {
        dbo.collection('dogs').find({
           "id": parseInt(matches[i])
        }).toArray(function (err, results) {
        if (err) throw err;
        var dog = results[0];

      var match = {
        "id": dog.id
        , "Name": dog.Name
        , "Breed": dog.Breed
        , "EnergyLevel": dog.EnergyLevel
        , "HouseTrained": dog.HouseTrained
        , "Size": dog.Size
        , "Image":dog.Image
      };
      matches_list.push(match);
      });
  };
res.json(matches_list);
matches_list = [];
});
});

// app.post('/getOwnerID', function(req, res) {
//   var username = req.body.Email;
//   dbo.collection('users').find({"email":username}).toArray(function (err, result) {
//     console.log("HIPPOS: " + result.length);
//     if (result.length > 1) {
//       res.json({"ownerID":result.loginID});
//     } else {
//       res.json({"ownerID":"Failure"});
//     }    
//   });
// });

app.all("*", (req, res) => {
  res.sendStatus(404);
});
