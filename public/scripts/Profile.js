/* Profile.js
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
import '../styles/profile.css';

module.exports = React.createClass({
  getInitialState: function() {
      console.log("myProfile-getInitialState");
      return { name: '',email: '', location: ''};
    },
  componentDidMount: function() {
      console.log("myProfile-componentDidMount");
        this.getProfileInformation();
      //  setInterval( this.props.pollInterval);
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
  getProfileInformation: function() {
      var loginID = this.getCookie("PinderloginID");
        $.ajax({
            url: "/profile",
            type: "POST",
            data: {"ownerID": loginID},
      success: function(data) {
        this.setState({name: data[0].name});
        this.setState({email: data[0].email});
        this.setState({location: data[0].Address});
        // $("#profileNameText").val(data[0].name);
        // $("#profileEmailText").val(data[0].email);
        // $("#profileLocationText").val(data[0].Address);

        //console.log("result: " + result);
        var image = new Image();
        image.src = data[0].ProfilePicture;
        $(".profileImage").attr("src", image.src);

        }.bind(this),
          error: function(xhr, status, err) {
            console.log("Error Produced!: " + err);
      }.bind(this)
      });  
  },
  updateInformation: function() {
      var loginID = this.getCookie("PinderloginID");
       $.ajax({
      url: "/saveProfile",
      type: "POST",
      data: {
        loginID: loginID,
        Name: $('#profileNameText').val(),
        Email: $('#profileEmailText').val(),
        Location: $('#profileLocationText').val()
      }
    })
    .done(function( result ) {
       console.log('AJAX POST succeded...');
      alert('Your changes have been saved');
    })
    .fail(function(xhr, status, errorThrown) {
      console.log('AJAX POST failed...');
    })  
  },
  nameChange: function(e) {
      this.setState({name: e.target.value}); 
    },
  emailChange: function(e) {
      this.setState({email: e.target.value}); 
    },
  locationChange: function(e) {
      this.setState({location: e.target.value}); 
    },
  backBttn: function() {
      ReactDOM.render(React.createElement(Selection), document.getElementById('login'))
    },
  changeAccnt: function() {
      ReactDOM.render(React.createElement(Login), document.getElementById('login'))
    },
  seeMatches: function() {
      ReactDOM.render(React.createElement(DogBox), document.getElementById('login'))
  },
  render: function() {
    return (
       <nav id="profileScreen">
        <div className="menuBar">
            <button id="backBttnMenu" className="smallBlueBttn" 
            onClick={this.backBttn} > Back</button>
            <label id="titleLabel">My Profile</label>
            <button id="myProfileBttnMenu" className="smallBlueBttn"
            onClick={this.changeAccnt} > Change
                Account</button>
        </div>
        <div id="profileImageHolder">
            <img className="profileImage"
            value={this.state.image} onChange={this.imageChange}  />
        </div>
        <div id="profileInputsContainer">
            <div className="profileInputRow">
                <label  htmlFor="profileName">Name: </label>
                <input className="profileInput" type="text" 
                placeholder="enter your name" name="profileName"  
                id="profileNameText"
                value={this.state.name} onChange={this.nameChange}/>
            </div>
            <div className="profileInputRow">
                <label htmlFor="profileContactEmail">Contact Email:</label>
                <input className="profileInput" type="text" 
                placeholder="enter your email" name="profileContactEmail" 
                value="" id="profileEmailText"
                value={this.state.email} onChange={this.emailChange} />
            </div>
            <div className="profileInputRow">
                <label htmlFor="profileLocation">Location:</label>
                <input className="profileInput" type="text" 
                placeholder="enter your city" name="profileLocation" value="" 
                id="profileLocationText"
                value={this.state.location} onChange={this.locationChange} />
            </div>
        </div>
        <div id="profileButtons">
            <button id="myMatchesProfileBttn" 
            className="profileBttn smallBlueBttn"
            onClick={this.seeMatches}  > My Matches</button>
            <button id="saveChangesProfileBttn" 
            className="profileBttn smallGreenBttn" onClick={this.updateInformation}>
             Save Changes</button>
        </div>
    </nav>
      );
  }
});
