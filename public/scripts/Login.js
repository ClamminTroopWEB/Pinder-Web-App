/* Login.js implements the AJAX requests necessary for index.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */
import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/login.css';
import '../styles/login.css';
import '../styles/shared.css';
import $ from 'jquery';



module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handleLoginClick: function() {
        $.ajax({
            url: "/",
            type: "post",
            data: {
              email: $('#loginEmail').val(),
              password: $('#loginPassword').val()
            }
        })
         .done(function(result){
            if (result.Result == "Failure") {
            console.log("Failure");
            alert("Incorrect Password or Username");
        } else if (result[0].loginID != "Failure") {
            setCookie('PinderloginID', result[0].loginID, 3);
            setCookie('PinderloginEmail', $('#loginEmail').val(), 3);
            setCookie('PinderloginPassword', $('#loginPassword').val(), 3);
            console.log("Cookies: " + getCookie('PinderloginID'));
            window.location.href = "../selection.html";
        }
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
            console.log('AJAX POST failed...');
            alert('some went wrong with the login');
         }.bind(this));
    },
    componentDidMount: function() {
        //this.handleLoginClick();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <nav id="loginScreen">
                <img id="pinderLogoMain" src="./images/mainLogoBlue.png" />
                <form id="loginForm" action="/login" method="POST">
                    <div id="loginInputs" class="blueRoundSquare">
                        <label id="loginFormTitle">Log In</label>
                        <br/>

                        <span class="formSpan">
                            <label class="loginFormLabel">Email: </label>
                            <input class="loginFormInput" type="email" placeholder="please enter an email" name="Name" value="" id="loginEmail"/>
                        </span>

                        <span class="formSpan">
                            <label class="loginFormLabel">Password: </label>
                            <input class="loginFormInput"  type="password" placeholder="please enter a password" name="Password" value="" id="loginPassword"/>
                        </span>

                        <span id="loginBttns" class="formSpan">
                            <input class="smallGreyBttn" id="loginToAccountBttn" text="Log In" onClick={this.handleLoginClick} type="button" value="Log In"/>
                            <input class="smallGreyBttn" id="" text="Create Account" type="button" value="Create Account" onClick={this.handleLoginClick}/>
                        </span>
                    </div>
                </form>
           </nav>
        );
    }
});







{/*function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
} */}