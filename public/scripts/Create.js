/* Create.js
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
import '../styles/login.css';

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
    // it's onload event and you forgot (parameters)
    reader.onload = function(e)  {
        // var image = document.createElement("img");
        // the result image data
        $('#PetPicture').attr("src",e.target.result ) ;
        console.log("Source Data: " + e.target.result);
        console.log("Img Data: " + $('#PetPicture').prop('src'));
       // document.body.appendChild(image);
        
     }
     // you have to declare the file loading
     reader.readAsDataURL(file);

     
    },
    loadLoginPage: function() {
        ReactDOM.render(React.createElement(Login), document.getElementById('login'));
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
        console.log(email, password, location, name)
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
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') c = c.substring(1, c.length);
              if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        console.log($('#PetPicture').prop('src'));
        $.ajax({
            url: '/create',
            type: 'post',
            data: {
              name: name,
              email: email,
              password: password,
              location: location,
              Image: $('#PetPicture').prop('src')
            }
          })
          .done(function (result) {
            // console.log("JSON: " + result[0].loginID);
            console.log('got what we needed: ' + result);
            if (result.Result == 'Failure') {
              console.log(result);
              alert("That Email has been taken, please choose another");
            } else {
              console.log("JSON: " + result);
              setCookie('PinderloginID', result.loginID, 3);
              setCookie('PinderloginEmail', $('#createAccountEmail').val(), 3);
              setCookie('PinderloginPassword', $('#createAccountPassword').val(), 3);
              console.log("Cookies: " + getCookie('PinderloginID'));
              ReactDOM.render(React.createElement(Selection), document.getElementById('login'));
            }
          })
          .fail(function (xhr, status, errorThrown) {
            console.log('failed: ' + errorThrown);
            console.log('AJAX POST failed...');
            //alert(xhr + " " +  status);
          });
    }, 
    render: function() {
        return(
            <nav id="loginScreen">
                    <img id="pinderLogoMain" src="../images/mainLogoBlue.png" />
                    <form id="loginForm" action="/create" method="post">
                        <div id="loginInputs" className="blueRoundSquare">
                            <label id="loginFormTitle">Create Account</label>
                            <br />
                            <span className="formSpan">
                                <label className="loginFormLabel">Email: </label>
                                <input className="loginFormInput" type="email" placeholder="please enter an email" name="email" value=""
                                    id="createAccountEmail" value={this.state.email} onChange={this.handleEmailChange} />
                            </span>
                            <span className="formSpan">
                                <label className="loginFormLabel">Password: </label>
                                <input className="loginFormInput" type="password" placeholder="please enter a password" name="password"
                                    value="" id="createAccountPassword" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </span>
                            <span className="formSpan">
                                <label className="loginFormLabel">Location: </label>
                                <input className="loginFormInput" type="text" placeholder="please enter a location" name="location"
                                    value="" id="createAccountLocation" value={this.state.location} onChange={this.handleLocationChange} />
                            </span>
                            <span className="formSpan">
                                <label className="loginFormLabel">Name: </label>
                                <input className="loginFormInput" type="text" placeholder="please enter your name" name="location"
                                    value="" id="createAccountName" value={this.state.name} onChange={this.handleNameChange} />
                            </span>
                            <span>
                              <label className="formLabel">Image: </label>
                              <input id="inp" type='file'
                              onChange= {this.readFile}/>
                              <img id="PetPicture" height="150"/> 
                           </span>


                            <span id="loginBttns" className="formSpan">
                                <input className="smallGreyBttn" id="backBttn" value="Back" onClick={this.loadLoginPage}/>
                                <input className="smallGreyBttn" id="loginToAccountBttn" type="button" value="Create Account" onClick={this.handleSubmitButton.bind(this, this.state.email,this.state.password, this.state.location, this.state.name)}/>
                            </span>
                        </div>
                </form>
            </nav>
        )
    } 
});
