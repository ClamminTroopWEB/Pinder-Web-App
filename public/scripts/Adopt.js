/* Adopt.js implements the AJAX requests necessary for adopt.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';
// import {Dog_Array, Dogs_Liked, index} from './global';
import '../styles/adopt.css';

var Dog_Array = [];
var Dogs_Liked = [];
var index = 0;

module.exports = React.createClass({
    getInitialState: function() {
        console.log("getInitialState");
        return {data: []};
    },
    componentDidMount: function() {
        console.log("componentDidMount");
        this.getAdoptInformation();
    },
    getCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    getAdoptInformation: function() {
        Dog_Array=[];
        Dogs_Liked = [];
        index = 0;
        
        console.log("getAdoptInformation");
        $.ajax({
            url: "/adopt",
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

                console.log(Dog_Array);

                $(".adopInfoNameDesc").text(Dog_Array[index].Name);
                $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
                $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

                var image = new Image();
                image.src = Dog_Array[index].Image;
                $(".adoptImage").attr("src", image.src);
              
                console.log("Dog_Array");
            }.bind(this), error: function(xhr, status, err) {
                console.log("Error: " + err);
            }.bind(this)
        });
    },
    handleAdoptClick: function() {
        console.log("handleAdoptClick");
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

            $(".adopInfoNameDesc").text(Dog_Array[index].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

            var image = new Image();
            image.src = Dog_Array[index].Image;
            $(".adoptImage").attr("src", image.src);
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
            $(".adopInfoNameDesc").text(Dog_Array[index].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

            var image = new Image();
            image.src = Dog_Array[index].Image;
            $(".adoptImage").attr("src", image.src);
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

        $(".adopInfoNameDesc").text(Dog_Array[index].Name);
        $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
        $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

        var image = new Image();
        image.src = Dog_Array[index].Image;
        $(".adoptImage").attr("src", image.src);
    },
    handleLeftClick: function() {
        console.log("handleLeftClick");
        if ((index - 1) < 0) {
            index = Dog_Array.length - 1;
        } else {
            index--;
        }

        $(".adopInfoNameDesc").text(Dog_Array[index].Name);
        $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
        $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

        var image = new Image();
        image.src = Dog_Array[index].Image;
        $(".adoptImage").attr("src", image.src);
    },
    handleBackClick: function() {
        console.log("back button clicked");
        alert("back button clicked");
        // TODO: Redirect to the "Selection" page
        // window.location.href = "../selection";
    },
    handleMyProfileClick: function() {
        console.log("my profile button clicked");
        alert("my profile button clicked");
        // TODO: Redirect to the "My Profile" page
        // window.location.href = "../profile";
    },
     backBttn: function() {
        ReactDOM.render(React.createElement(Selection), document.getElementById('login'))
    },
    profileAcct: function() {
        ReactDOM.render(React.createElement(ProfilePage), document.getElementById('login'))
    },

    render: function() {
        console.log("Render: " + this.state);
        return (
            <nav id="adoptScreen">
            <div className="menuBar">
                 <button id="backBttnMenu" className="smallBlueBttn" 
            onClick={this.backBttn} > Back</button>
            <button id="myProfileBttnMenu" className="smallBlueBttn"
            onClick={this.profileAcct} > My Profile</button>
            </div>
            <div id='adopContainer'>
            <div id="adoptImageHolder">
                <img className="adoptImage"/>
            </div>
            <div id="swipeButtons">
                <img id="rightBttn" src="../images/moveRight.png" onClick={this.handleRightClick.bind(this)}/>
                <img id="leftBttn" src="../images/moveLeft.png" onClick={this.handleLeftClick.bind(this)}/>
            </div>
            <div id="adoptInfoContainer">
            <div className='adoptInfoLine'>
                <span className="adopInfoName">Name: </span>
                <span className="adopInfoNameDesc"></span>
            </div>
            <br/>
                <div className='adoptInfoLine'>
                <span className="adopInfoBreed">Breed:</span>
                <span className="adopInfoBreedDesc"></span>
            </div>
            <br/>
            <div className='adoptInfoLineLast'>
                <span className="adopInfoGender">Gender:</span>
                <span className="adopInfoGenderDesc"></span>
            </div>
            </div>
            <div id="adoptButtonContainer">
                <img src="../images/xout.png" id="xoutButton" onClick={this.handleRejectClick.bind(this)}/>
                <img src="../images/greenHeart.png" id="heartButton" onClick={this.handleAdoptClick.bind(this)}/>
            </div>
            </div>
            </nav>
        )
    }
});
