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
import Remarkable from 'remarkable';
import $ from 'jquery';
import List from './List.js';
import Adopt from './Adopt.js';
import DogBox from './DogBox.js';
import Profile from './Profile.js';
// import '../styles/selection.css';

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
      <nav id="mainScreen">
        <img id="pinderLogoMain" src="../images/mainLogoBlue.png"/>
        <div id="bttnContainer">
          <button id="listPetBttn" className="blueBttn" onClick={this.listaPet}>List Pet</button>
          <button id="adoptPetBttn" className="blueBttn" onClick={this.adoptaPet}>Adopt a Pet</button>
          <button id="yourMatchesBttn" className="blueBttn" onClick={this.yourMatches}>Your Matches</button>
        </div>
        <button id="myProfileBttn" className="smallBlueBttn" onClick={this.yourProfile}>My Profile</button>
      </nav>
    );
  }
});
