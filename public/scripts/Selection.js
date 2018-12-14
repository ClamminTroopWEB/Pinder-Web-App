/* Selection.js implements the react component for the Selection route
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
import { browserHistory } from 'react-router';
import Remarkable from 'remarkable';
import $ from 'jquery';
import List from './List.js';
import Adopt from './Adopt.js';
import DogBox from './DogBox.js';
import Profile from './Profile.js';
import c from '../styles/style.css';


module.exports = React.createClass({

  componentDidMount: function() {
    console.log("componentDidMount");
    this.checkForBadLogin();
  },
  checkForBadLogin: function() {
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
    /*
    if(getCookie('accountError') == 'true'){
        console.log(getCookie(getCookie('accountError')));
      browserHistory.push('/create');
    } /*else if (getCookie('loginError') == 'true'){
       console.log(getCookie(getCookie('loginError')));
      browserHistory.push('/login');
    }*/
  },
  render: function() {
    return (
      <nav id={c.mainScreen}>

        <img id={c.pinderLogoMain} src="https://i.imgur.com/pbgkjCN.png"/>
        <div id={c.bttnContainer} > 
        
          <Link to="/List">
          <button id={c.listPetBttn} className={c.blueBttn}>List Pet</button>
          </Link>
      
          <Link to="/Adopt"><button id={c.adoptPetBttn} className={c.blueBttn}>Adopt a Pet</button></Link>
          <Link to="/Matches"><button id={c.yourMatchesBttn} className={c.blueBttn}>Your Matches</button></Link>
      
        </div>
        <Link to="/Profile"><button id={c.myProfileBttn} className={c.smallBlueBttn} onClick={this.yourProfile}>My Profile</button></Link>
      </nav>
    );
  }
});
