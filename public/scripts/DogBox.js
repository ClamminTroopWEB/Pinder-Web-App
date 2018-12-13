/* DogBox.js implements the react component container for 
 * DogTable and displays it on the Matches route
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
import DogTable from './DogTable.js'
import Selection from './Selection.js';
import Profile from './Profile.js';
import c from '../styles/combined.css';

module.exports = React.createClass({
  loadDogsFromServer: function() {
    var personID = this.getCookie("PinderloginID");
    $.ajax({
      url: "/matches",
      dataType: 'json',
      type: 'post',
      data: { "loginID": personID },
      success: function(data) {
        this.setState({ data: data });
      }.bind(this), error: function(xhr, status, err) {
        console.log("Matches: " + xhr.status);
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
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
  componentDidMount: function() {
    this.loadDogsFromServer();
  },
  render: function() {
    return (
    <nav id={c.matchesScreen}>
      <div className={c.menuBar}>
        <Link to="/Selection"><button id={c.backBttnMenu} className={c.smallBlueBttn} onClick={this.backBttn}>Back</button></Link>
        <Link to="/Profile"><button id={c.myProfileBttnMenu} className={c.smallBlueBttn} onClick={this.profileAcct}>My Profile</button></Link>
      </div>
      <div id={c.tableHeading}>
        <label>Your Matches</label>
      </div>
      <div id={c.matchesTableBackground}>
        <table>  
          <DogTable data={this.state.data} />
        </table>
      </div>
    </nav>
    );
  }
});
