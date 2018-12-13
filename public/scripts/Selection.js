/* Selection.js
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
import List from './List.js';
import Adopt from './Adopt.js';
import DogBox from './DogBox.js';
import Profile from './Profile.js';
import c from '../styles/combined.css';

module.exports = React.createClass({
  listaPet: function() {
    ReactDOM.render(React.createElement(List), document.getElementById('login'));
  },
  adoptaPet: function() {
    ReactDOM.render(React.createElement(Adopt), document.getElementById('login'));
  },
  yourMatches: function() {
    ReactDOM.render(React.createElement(DogBox), document.getElementById('login'));
  },
  yourProfile: function() {
    ReactDOM.render(React.createElement(Profile), document.getElementById('login'));
  },
  render: function() {
    return (
      <nav id={c.mainScreen}>
        <img id={c.pinderLogoMain} src="https://i.imgur.com/pbgkjCN.png"/>
        <div id={c.bttnContainer}>
          <Link to="/List"><button id={c.listPetBttn} className={c.blueBttn}>List Pet</button></Link>
          <Link to="/Adopt"><button id={c.adoptPetBttn} className={c.blueBttn} onClick={this.adoptaPet}>Adopt a Pet</button></Link>
          <Link to="/Matches"><button id={c.yourMatchesBttn} className={c.blueBttn} onClick={this.yourMatches}>Your Matches</button></Link>
        </div>
        <Link to="/Profile"><button id={c.myProfileBttn} className={c.smallBlueBttn} onClick={this.yourProfile}>My Profile</button></Link>
      </nav>
    );
  }
});
