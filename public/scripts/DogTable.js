/* DogTable.js implements the react component that 
 * displays inside the DogBox on the Matches route
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
import c from '../styles/combined.css';

module.exports = React.createClass({
  getCookie: function(name) {
    var nameEquals = name + "=";
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEquals) == 0) return cookie.substring(nameEquals.length, cookie.length);
    }
  return null;
  }.bind(this),
  getDogProfile: function(e) {
     var personID = this.getCookie("PinderloginID");
    var dogID = e.id;
    $.ajax({
      url: "/deleteMatch",
      dataType: 'json',
      type: "put",
      data: { 
      "loginID": personID, 
      "dogID": dogID
      },
    })
    .done(function( result ) {
      console.log(result);
      alert('Removed Dog from your Matches!');
    })
    .fail(function(xhr, status, errorThrown) {
      console.log('AJAX POST failed...');
    })
  }.bind(this),
  render: function() {
    const dogNodes = this.props.data.map(function(dog) {
    return (
        <tr key={dog.id}>
          <td className={c.matchBreed}>{dog.Breed}</td>
          <td className={c.matchName}>{dog.Name}</td>
          <td className={c.matchImage}> <img src={dog.Image}/> </td>
          <td className={c.matchImage}><button onClick={this.getDogProfile.bind(this, dog)}>Unmatch</button></td>
        </tr>
      );
    }.bind(this));
    return (
      <tbody className={c.dogTable}>
        {dogNodes}
      </tbody>
    );
  }
});
