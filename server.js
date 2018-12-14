/* server.js implements the server and the server-side routing
 * that allows the application to communicate with the database
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

   /*    This server controls the server-side endpoints of the app    */


"use_strict";

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var multer = require('multer');
var APP_PATH = path.join(__dirname, 'dist');
var dbo;
var peopleList;
var matches=[];
var matches_list = [];

MongoClient.connect(`mongodb://clammintroopweb:${process.env.MONGO_PASSWORD}@ds033056.mlab.com:33056/pinder-web-app`, function (err, client) {
  if (err) throw err
  dbo = client.db('pinder-web-app')

  dbo.collection('dogs').find().toArray(function (err, result) {
    if (err) throw err
    peopleList = result;
  });

  app.listen(app.get('port'), function() { console.log('Server started: http://' + app.get('host') + ':' + app.get('port') + '/'); });
});

app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));
app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', function (req, res) {
  dbo.collection('users').find({
    "email": req.body.email,
    "password": req.body.password
  }).toArray(function (err, result) {
    if (result.length > 0) {
      var response = {
        loginID: result[0].loginID,
        email: result[0].email,
        password: result[0].password
      };
      res.send(JSON.stringify(response));
    } else {
      res.send({
        loginID: "Failure"
      });
    }
  });
});

app.post('/create', function (req, res) {
  var total;
  dbo.collection('users').find().toArray(function (err, result) {
    if (err) throw err
    total = result.length
  
    dbo.collection('users').find({
      "email": req.body.email
    }).toArray(function (err, result) {
      if (err) {
        res.send(err);
      }
      if (result.length != 0) {
        res.send({
          "loginID": 'Failure'
        });
      } else if (result.length == 0) {
          dbo.collection('users').insertOne({
            name: req.body.name,
            loginID: total + 1,
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
              "loginID": total + 1
            });
        });
      }
    });
  });
});

app.get('/adoptApet', function (req, res) {
  dbo.collection('dogs').find().toArray(function (err, result) {
    if (err) throw err
    peopleList = result;
    res.json(result);
  });
});

app.post('/profile', function (req, res) {
  var ownerID = req.body.ownerID;

  dbo.collection('users').find({
    "loginID": parseInt(ownerID)
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

app.post('/saveProfile', function (req, res) {
  var ownerID = req.body.loginID;
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
      var dogID = result.length + 1;
    dbo.collection('dogs').insertOne({
      id: dogID,
      Name: req.body.Name,
      Gender: req.body.Gender,
      Breed: req.body.Breed,
      EnergyLevel: req.body.EnergyLevel,
      HouseTrained: req.body.HouseTrained,
      Size: req.body.Size,
      Image: req.body.Image
    });
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
    matches.forEach(function(element) {
      dbo.collection('dogs').find({
        "id": parseInt(element)
      }).toArray(function (err, results) {
        if (err) throw err;
        var dog = results[0];

        var match = {
          "id": dog.id,
          "Name": dog.Name,
          "Breed": dog.Breed,
          "EnergyLevel": dog.EnergyLevel,
          "HouseTrained": dog.HouseTrained,
          "Size": dog.Size,
          "Image": dog.Image
        };
        matches_list.unshift(match);
      });
    });
    setTimeout(function(){
      res.json(matches_list);
      matches_list = [];
    }, 500);
  });
});

app.put('/deleteMatch', function (req, res) {
  dbo.collection('users').find({
    "loginID": parseInt(req.body.loginID)
  }).toArray(function (err, result) {
    if (err) throw err;
    var newmatches = [];
    var matches = result[0].matches;

    for (i = 0; i < matches.length; i++) {
      if (req.body.dogID != matches[i]) {
        newmatches.push(matches[i]);
      }
    }

    dbo.collection('users').updateOne({
      "loginID": parseInt(req.body.loginID)
    }, {
      $set: {
        "matches": newmatches
      }
    });
  });
});

app.use('*', express.static(APP_PATH));
