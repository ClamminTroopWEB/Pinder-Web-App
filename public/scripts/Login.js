/* Login.js implements the react component for the Login route
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

// TODO: refactor author into a more accurate name

"use_strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Remarkable from 'remarkable';
import $ from 'jquery';
import Selection from './Selection.js';
import Create from './Create.js';
import c from '../styles/combined.css';

module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  handleLoginClick: function(loginID, Password) {
    $.ajax({
        url: "/login",
        type: "post",
        dataType: 'json',
        data: {
        email: loginID,
        password: Password
      },
      success: function(data) {
        console.log("Result: " + data.loginID);
      if (data.loginID == "Failure") {
        alert("Incorrect Password or Username");
      } else  {
        this.setCookie('PinderloginID', data.loginID, 3);
        this.setCookie('PinderloginEmail', loginID, 3);
        this.setCookie('PinderloginPassword', Password, 3);
        console.log("Cookies: " + this.getCookie('PinderloginID'))
      }
      }.bind(this), error: function(xhr, status, err) {
        console.log("Error Produced!: " + err);
      }.bind(this)
    });
  },
  componentDidMount: function() {
    console.log("componentDidMount");
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
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
  render: function() {
    return (
      <nav id={c.loginScreen}>
        <img id={c.pinderLogoMain} src="https://i.imgur.com/pbgkjCN.png" />
        <form id={c.loginForm} action="/login" method="POST">
          <div id={c.loginInputs} className={c.blueRoundSquare}>
            <label id={c.loginFormTitle}>Log In</label>
            <br/>
            <span className={c.formSpan}>
              <label className={c.loginFormLabel}>Email: </label>
              <input className={c.loginFormInput} type="email" placeholder="please enter an email"
              name="Name" id={c.loginEmail} 
              value={this.state.author} onChange={this.handleAuthorChange}/>
            </span>
            <span className={c.formSpan}>
              <label className={c.loginFormLabel}>Password: </label>
              <input className={c.loginFormInput} type="password" 
              placeholder="please enter a password"  name="Password" value="" id={c.loginPassword}
              value={this.state.text} onChange={this.handleTextChange}/>
            </span>
            <span id={c.loginBttns} className={c.formSpan}>
              <Link to="/Selection" onClick={this.handleLoginClick.bind(this, this.state.author,this.state.text)}>
              <button className={c.smallGreyBttn} id={c.loginToAccountBttn}>Log In</button></Link>
              <Link to="/Create"><button className={c.smallGreyBttn}>Create Account</button></Link>
            </span>
          </div>
        </form>
      </nav>
    )
  }
});
