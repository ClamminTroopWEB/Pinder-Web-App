/* DogTable.js
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
import '../styles/matches.css';

module.exports = React.createClass({
  getCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }.bind(this),

 nameSomething123Dogs: function(e) {
    var personID = getCookie("PinderloginID");
    var dogID = e.id;
    $.ajax({
      url: "/deleteMatch",
      dataType: 'json',
      type: 'put',
      data: { 
        "loginID": personID, 
        "dogID": dogID
      },
    })
    .done(function( result ) {
      console.log(result);
      alert('Removed Dog from your Matches!');
      //window.location.href = "../selection.html";
    })
    .fail(function(xhr, status, errorThrown) {
      console.log('AJAX POST failed...');
     // window.location.href = "../selection.html";
    })

  }.bind(this),
  // calvins internet sucks,   
  render: function() {
    const dogNodes = this.props.data.map(function(dog) {
      return (
        <tr key={dog.id}>
          <td className="matchBreed">{dog.Breed}</td>
          <td className="matchName">{dog.Name}</td>
          <td className="matchImage"> <img src={dog.Image}/> </td>
          <td className="matchImage"> <button onClick={this.nameSomething123Dogs.bind(this, dog)}>Unmatch</button> </td>
        </tr>
      );
    }.bind(this));
    return (
      <tbody className="dogTable">
        {dogNodes}
      </tbody>
    );
  }
});
