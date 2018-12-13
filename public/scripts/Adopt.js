/* Adopt.js implements the react component for the Adopt route
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Remarkable from 'remarkable';
import $ from 'jquery';
import Selection from './Selection.js';
import Profile from './Profile.js';
import c from '../styles/combined.css';

var Dog_Array = [];
var Dogs_Liked = [];
var index = 0;

module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getAdoptInformation();
  },
  getCookie: function(name) {
    var nameEquals = name + "=";
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEquals) == 0) return cookie.substring(nameEquals.length, cookie.length);
    }
    return null;
  },
  getAdoptInformation: function() {
    Dog_Array=[];
    Dogs_Liked = [];
    index = 0;

    $.ajax({
      url: "/adoptApet",
      type: "get",
      success: function(data) {
      for (var i = 0; i < data.length; i++) {
        var Dog = {
          "Name": data[i].Name,
          "Gender": data[i].Gender,
          "DogID": data[i].id,
          "Breed": data[i].Breed,
          "Image": data[i].Image
        }
        Dog_Array.push(Dog);
      }

      $("#adopInfoNameDesc").text(Dog_Array[index].Name);
      $("#adopInfoBreedDesc").text(Dog_Array[index].Breed);
      $("#adopInfoGenderDesc").text(Dog_Array[index].Gender);

      var image = new Image();
      image.src = Dog_Array[index].Image;
      $("#adoptImage").attr("src", image.src);

      }.bind(this), error: function(xhr, status, err) {
        console.log("Error: " + err);
      }.bind(this)
    });
  },
  handleAdoptClick: function() {
    $.ajax({
      url: "/itsamatch",
      type: "put",
      data: {
      "loginID": this.getCookie("PinderloginID"),
      "dogID": Dog_Array[index].DogID
      }
    })
    .done(function (result) {
      console.log("Added to your matches!");
    })
    .fail(function (xhr, status, errorThrown) {
      console.log('AJAX PUT failed...');
    });

    if (Dog_Array.length > 1) {
      var indexToSplice = index;
      Dog_Array.splice(indexToSplice, 1);
      if (Dog_Array[index] == null) {
        index = 0;
      }

      $("#adopInfoNameDesc").text(Dog_Array[index].Name);
      $("#adopInfoBreedDesc").text(Dog_Array[index].Breed);
      $("#adopInfoGenderDesc").text(Dog_Array[index].Gender);

      var image = new Image();
      image.src = Dog_Array[index].Image;
      $("#adoptImage").attr("src", image.src);
    } else {
      alert('You have matched with them all');
    }
  },
  handleRejectClick: function() {
    console.log("handleRejectClick");
    var indexToSplit = index;
    if (Dog_Array.length > 1) {
      indexToSplit = index;
      Dog_Array.splice(indexToSplit, 1);
    if (Dog_Array[index] == null) {
      index = 0;
    } else {

    }

    $("#adopInfoNameDesc").text(Dog_Array[index].Name);
    $("#adopInfoBreedDesc").text(Dog_Array[index].Breed);
    $("#adopInfoGenderDesc").text(Dog_Array[index].Gender);

    var image = new Image();
    image.src = Dog_Array[index].Image;
    $("#adoptImage").attr("src", image.src);

    } else {
      alert("You have already disliked all the dogs");
    }
  },
  handleRightClick: function() {
    console.log("handleRightClick");
    if ((index + 1) > Dog_Array.length - 1) {
      index = 0;
    } else {
      index++;
    }

    $("#adopInfoNameDesc").text(Dog_Array[index].Name);
    $("#adopInfoBreedDesc").text(Dog_Array[index].Breed);
    $("#adopInfoGenderDesc").text(Dog_Array[index].Gender);

    var image = new Image();
    image.src = Dog_Array[index].Image;
    $("#adoptImage").attr("src", image.src);
  },
  handleLeftClick: function() {
    if ((index - 1) < 0) {
      index = Dog_Array.length - 1;
    } else {
      index--;
    }

    $("#adopInfoNameDesc").text(Dog_Array[index].Name);
    $("#adopInfoBreedDesc").text(Dog_Array[index].Breed);
    $("#adopInfoGenderDesc").text(Dog_Array[index].Gender);

    var image = new Image();
    image.src = Dog_Array[index].Image;
    $("#adoptImage").attr("src", image.src);
  },
  render: function() {
    console.log("Render: " + this.state);
    return (
      <nav id={c.adoptScreen}>
        <div className={c.menuBar}>
          <Link to="/Selection"><button id={c.backBttnMenu} className={c.smallBlueBttn}>Back</button></Link>
          <Link to="/Profile"><button id={c.myProfileBttnMenu} className={c.smallBlueBttn}>My Profile</button></Link>
        </div>
        <div id={c.adopContainer}>
          <div id={c.adoptImageHolder}>
            <img id="adoptImage" className={c.adoptImage}/>
          </div>
          <div id={c.swipeButtons}>
            <img id={c.rightBttn} src="https://i.imgur.com/fv9H3GL.png" onClick={this.handleRightClick.bind(this)}/>
            <img id={c.leftBttn} src="https://i.imgur.com/vbjQyQd.png" onClick={this.handleLeftClick.bind(this)}/>
          </div>
          <div id={c.adoptInfoContainer}>
            <div className={c.adoptInfoLine}>
              <span className={c.adopInfoName}>Name: </span>
              <span id="adopInfoNameDesc" className={c.adopInfoNameDesc}></span>
            </div>
            <br/>
            <div className={c.adoptInfoLine}>
              <span className={c.adopInfoBreed}>Breed: </span>
              <span id="adopInfoBreedDesc" className={c.adopInfoBreedDesc}></span>
            </div>
            <br/>
            <div className={c.adoptInfoLineLast}>
              <span className={c.adopInfoGender}>Gender: </span>
              <span id="adopInfoGenderDesc" className={c.adopInfoGenderDesc}></span>
            </div>
          </div>
          <div id={c.adoptButtonContainer}>
            <img src="https://i.imgur.com/fwQiRUQ.png" id={c.xoutButton} onClick={this.handleRejectClick.bind(this)}/>
            <img src="https://i.imgur.com/pPMPxhf.png" id={c.heartButton} onClick={this.handleAdoptClick.bind(this)}/>
          </div>
        </div>
      </nav>
    )
  }
});
