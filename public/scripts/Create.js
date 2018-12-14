/* Create.js implements the react component for the Create route
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
import { browserHistory } from 'react-router';
import Login from './Login.js'
import c from '../styles/combined.css';

module.exports = React.createClass ({
  getInitialState: function() {
    console.log("getInitialState");
    return {data: []};
  },
  componentDidMount: function() {
    console.log("componentDidMount");
  },
  readFile: function() {
    var file = document.getElementById('inp').files[0];
    var reader  = new FileReader();
    reader.onload = function(e) {
      $('#PetPicture').attr("src",e.target.result ) ;
    }
    reader.readAsDataURL(file);
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleLocationChange: function(e) {
    this.setState({location: e.target.value});
  },

  handleSubmitButton: function(email, password, location, name) {
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
      var nameEquals = name + "=";
      var cookieArray = document.cookie.split(';');
      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEquals) == 0) return cookie.substring(nameEquals.length, cookie.length);
      }
      return null;
    }
    $.ajax({
      url: "/create",
      type: "post",
      data: {
      name: name,
      email: email,
      password: password,
      location: location,
      Image: $('.PetPicture').prop('src')
    },
    success: function(data) {
        console.log("Result: " + data.loginID);
        if (data.loginID == "Failure") {
          alert("That Email has been taken, please choose another");
        } else  {
          this.setCookie('PinderloginID', data.loginID, 3);
          this.setCookie('PinderloginEmail', data.email, 3);
          this.setCookie('PinderloginPassword', data.password, 3);
          console.log("Cookies: " + getCookie('PinderloginID'));
          browserHistory.push('/Selection');


        }
    }.bind(this), 
    error: function(xhr, status, err) {
        console.log("Error Produced!: " + err);
        alert("Image file was too large, please limit it to less than 2 KB");
      }.bind(this)
    });
  }, 
  setCookie: function(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }, 
  render: function() {
    return (
      <nav id={c.loginScreen}>
        <img id={c.pinderLogoMain} src="https://i.imgur.com/pbgkjCN.png"/>
        <form id={c.loginForm} action="/create" method="post">
          <div id={c.loginInputs} className={c.blueRoundSquare}>
            <label id={c.loginFormTitle}>Create Account</label>
            <br/>
            <span className={c.formSpan}>
              <label className={c.loginFormLabel}>Email: </label>
              <input className={c.loginFormInput} type="email" placeholder="please enter an email" name="email" value=""
              id={c.createAccountEmail} value={this.state.email} onChange={this.handleEmailChange}/>
            </span>
            <span className={c.formSpan}>
              <label className={c.loginFormLabel}>Password: </label>
              <input className={c.loginFormInput} type="password" placeholder="please enter a password" name="password"
              value="" id={c.createAccountPassword} value={this.state.password} onChange={this.handlePasswordChange}/>
            </span>
            <span className={c.formSpan}>
              <label className={c.loginFormLabel}>Location: </label>
              <input className={c.loginFormInput} type="text" placeholder="please enter a location" name="location"
              value="" id={c.createAccountLocation} value={this.state.location} onChange={this.handleLocationChange} />
            </span>
            <span className={c.formSpan}>
              <label className={c.loginFormLabel}>Name: </label>
              <input className={c.loginFormInput} type="text" placeholder="please enter your name" name="location"
              value="" id={c.createAccountName} value={this.state.name} onChange={this.handleNameChange} />
            </span>
            <span>
              <label className={c.formLabel}>Image: </label>
              <input id='inp' type='file' onChange={this.readFile}/>
              <img id="PetPicture" className="PetPicture" height="150"/> 
            </span>
            <span id={c.loginBttns} className={c.formSpan}>
              <Link to="/Login"><button className={c.smallGreyBttn} id={c.backBttn}>Back</button></Link>
              <Link to="/Create" onClick={this.handleSubmitButton.bind(this, this.state.email, this.state.password, this.state.location, this.state.name)}>
              <button className={c.smallGreyBttn} id={c.loginToAccountBttn}>
              Create Account</button></Link>
            </span>
          </div>
        </form>
      </nav>
    )
  } 
});
