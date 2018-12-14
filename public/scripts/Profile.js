/* Profile.js implements the react component for the Profile route
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

 /*    This Component allows users to view their profile and change their info                */


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
    return { name: '',email: '', location: ''};
  },
  componentDidMount: function() {
    this.getProfileInformation();
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
  deleteCookie: function(name) {
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
  getProfileInformation: function() {
    var loginID = this.getCookie("PinderloginID");
    $.ajax({
      url: "/profile",
      type: "post",
      data: {"ownerID": loginID},
      success: function(data) {
        this.setState({name: data[0].name});
        this.setState({email: data[0].email});
        this.setState({location: data[0].Address});
        var image = new Image();
        image.src = data[0].ProfilePicture;
        $("#profileImage").attr("src", image.src);
      }.bind(this), error: function(xhr, status, err) {
        console.log("Error Produced!: " + err);
      }.bind(this)
    });  
  },
  updateInformation: function() {
    var loginID = this.getCookie("PinderloginID");
    $.ajax({
      url: "/saveProfile",
      type: "post",
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
  render: function() {
    return (
       <nav id={c.profileScreen}>
        <div className={c.menuBar}>
            <Link to="/Selection"><button id={c.backBttnMenu} className={c.smallBlueBttn}>Back</button></Link>
            <label id={c.titleLabel}>My Profile</label>
            <Link to="/Login"><button id={c.myProfileBttnMenu} className={c.smallBlueBttn} onClick={this.deleteCookie.bind(this)}>Log Out</button></Link>
        </div>
        <div id={c.profileImageHolder}>
            <img className={c.profileImage} id="profileImage"
            value={this.state.image} onChange={this.imageChange} />
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
                value={this.state.email} onChange={this.emailChange}/>
            </div>
            <div className={c.profileInputRow}>
                <label htmlFor="profileLocation">Location:</label>
                <input className={c.profileInput} type="text" 
                placeholder="enter your city" name="profileLocation" value="" 
                id={c.profileLocationText} className="profileLocationText"
                value={this.state.location} onChange={this.locationChange}/>
            </div>
        </div>
        <div id={c.profileButtons}>
            <Link to="/Matches"><button id={c.myMatchesProfileBttn} className={c.profileBttn, c.smallBlueBttn}>My Matches</button></Link>
            <button id={c.saveChangesProfileBttn} className={c.profileBttn, c.smallGreenBttn} onClick={this.updateInformation}>Save Changes</button>
        </div>
    </nav>
    );
  }
});
