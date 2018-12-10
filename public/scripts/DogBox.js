/* DogBox.js
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
import DogTable from './DogTable.js'
import Selection from './Selection.js';
import Profile from './Profile.js';
import '../styles/matches.css';

module.exports = React.createClass({
  loadDogsFromServer: function() {
    var personID = this.getCookie("PinderloginID");
   $.ajax({
      url: "/matches",
      dataType: 'json',
      type: 'post',
      data: { "loginID": personID },
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Matches: " + xhr.status);
        console.error(this.props.url, status, err.toString());
      }.bind(this)
  });
  },
  getInitialState: function() {
    return {data: []};
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
  componentDidMount: function() {
    this.loadDogsFromServer();
  //  setInterval(this.loadDogsFromServer, this.props.pollInterval);
  },
  backBttn: function() {
    ReactDOM.render(React.createElement(Selection), document.getElementById('login'))
  },
  profileAcct: function() {
    ReactDOM.render(React.createElement(Profile), document.getElementById('login'))
  },
  render: function() {
    return (
       <nav id="matchesScreen">
        <div className="menuBar">
             <button id="backBttnMenu" className="smallBlueBttn" 
            onClick={this.backBttn} > Back</button>
            <button id="myProfileBttnMenu" className="smallBlueBttn"
            onClick={this.profileAcct} > My Profile</button>
        </div>
        <div id="tableHeading">
            <label> Your Matches </label>
        </div>
        <div id="matchesTableBackground">
           <table>  
              <DogTable data={this.state.data} />
          </table>
        </div>
    </nav>

     
    );
  }
});