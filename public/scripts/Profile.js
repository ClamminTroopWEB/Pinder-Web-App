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
import { Link } from 'react-router';
import Remarkable from 'remarkable';
import $ from 'jquery';
import Selection from './Selection.js';
import Login from './Login.js';
import DogBox from './DogBox';
import c from '../styles/combined.css';

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
    deleteCookie: function(name) {
      document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
        // $(".profileNameText").val(data[0].name);
        // $(".profileEmailText").val(data[0].email);
        // $(".profileLocationText").val(data[0].Address);

        //console.log("result: " + result);
        var image = new Image();
        image.src = data[0].ProfilePicture;
        $("#profileImage").attr("src", image.src);

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
        Name: $('.profileNameText').val(),
        Email: $('.profileEmailText').val(),
        Location: $('.profileLocationText').val()
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
       <nav id={c.profileScreen}>
        <div className={c.menuBar}>
            <Link to="/Selection"><button id={c.backBttnMenu} className={c.smallBlueBttn}>Back</button></Link>
            <label id={c.titleLabel}>My Profile</label>
            <Link to="/"><button id={c.myProfileBttnMenu} className={c.smallBlueBttn} onClick={this.deleteCookie.bind(this)}>Log Out</button></Link>
        </div>
        <div id={c.profileImageHolder}>
            <img className={c.profileImage} id="profileImage"
            value={this.state.image} onChange={this.imageChange}  />
        </div>
        <div id={c.profileInputsContainer}>
            <div className={c.profileInputRow}>
                <label  htmlFor="profileName">Name: </label>
                <input className={c.profileInput} type="text" 
                placeholder="enter your name" name="profileName"  
                id={c.profileNameText} className="profileNameText"
                value={this.state.name} onChange={this.nameChange}/>
            </div>
            <div className={c.profileInputRow}>
                <label htmlFor="profileContactEmail">Contact Email:</label>
                <input className={c.profileInput} type="text" 
                placeholder="enter your email" name="profileContactEmail" 
                value="" id={c.profileEmailText} className="profileEmailText"
                value={this.state.email} onChange={this.emailChange} />
            </div>
            <div className={c.profileInputRow}>
                <label htmlFor="profileLocation">Location:</label>
                <input className={c.profileInput} type="text" 
                placeholder="enter your city" name="profileLocation" value="" 
                id={c.profileLocationText} className="profileLocationText"
                value={this.state.location} onChange={this.locationChange} />
            </div>
        </div>
        <div id={c.profileButtons}>
            <Link to="/Matches"><button id={c.myMatchesProfileBttn} className={c.profileBttn, c.smallBlueBttn}>My Matches</button></Link>
            <Link to="/Profile"><button id={c.saveChangesProfileBttn} className={c.profileBttn, c.smallGreenBttn}>Save Changes</button></Link>
        </div>
    </nav>
      );
  }
});
