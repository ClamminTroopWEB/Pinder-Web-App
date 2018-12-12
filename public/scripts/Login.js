/* Login.js
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
import Selection from './Selection.js';
import Create from './Create.js';
import c from '../styles/combined.css';


module.exports = React.createClass({
    getInitialState: function() {
      console.log("getInitialState");
         return {data: []};
    },
    handleLoginClick: function(loginID,Password) {


      var response;
        console.log("Email: " + loginID);
        console.log("Password: " + Password);
    $.ajax({
            url: "/login",
            type: "POST",
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
                    //alert('got the right data');
                    this.setCookie('PinderloginID', data.loginID, 3);
                    this.setCookie('PinderloginEmail', loginID, 3);
                    this.setCookie('PinderloginPassword', Password, 3);
                    console.log("Cookies: " + this.getCookie('PinderloginID'))
                    ReactDOM.render(React.createElement(Selection), document.getElementById('login'))
          }
        }.bind(this),
          error: function(xhr, status, err) {
            console.log("Error Produced!: " + err);
      }.bind(this)
      });
     },
    componentDidMount: function() {
      console.log("componentDidMount");
      //  this.loadCommentsFromServer();
      //  setInterval( this.props.pollInterval);
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
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    GuestGreeting(props) {
        return <MyImage>Please sign up.</MyImage>;
    },

    createAccount() {
      ReactDOM.render(React.createElement(Create), document.getElementById('login'))
    },

    render: function() {
      console.log(this.state);
      console.log("render");

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
                     value={this.state.author} onChange={this.handleAuthorChange} />
                </span>

                <span className={c.formSpan}>
                    <label className={c.loginFormLabel}>Password: </label>
                    <input className={c.loginFormInput} type="password" 
                    placeholder="please enter a password"  name="Password" value="" id={c.loginPassword}
                     value={this.state.text} onChange={this.handleTextChange} />
                </span>

                <span id={c.loginBttns} className={c.formSpan}>
                    <input className={c.smallGreyBttn} id={c.loginToAccountBttn}


                    type="button" value="Log In"
                    onClick = {this.handleLoginClick.bind(this, this.state.author,this.state.text)}
                    />
                    <input className={c.smallGreyBttn}  
                    type="button" value="Create Account"
                    onClick={this.createAccount} />
                </span>
                 </div>
             </form>
      </nav>
        )
    }
});
