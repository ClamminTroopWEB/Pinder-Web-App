/* List.js
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
import Selection from './Selection.js';
import Profile from './Profile.js';
import c from '../styles/combined.css';

module.exports = React.createClass({
  getInitialState: function() {
      return {data: []};
  },
  readFile: function() {

   var file = document.getElementById('inp').files[0];
    var reader  = new FileReader();
    // it's onload event and you forgot (parameters)
    reader.onload = function(e)  {
        // var image = document.createElement("img");
        // the result image data
        $('.PetPicture').attr("src",e.target.result ) ;
        console.log("Source Data: " + e.target.result);
        console.log("Img Data: " + $('.PetPicture').prop('src'));
       // document.body.appendChild(image);
        
     }
     // you have to declare the file loading
     reader.readAsDataURL(file);

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
  submitPet: function() {
    $.ajax({
      url: "/newPet",
      type: "POST",
      data: {
        Name: $('#listAPetName').val(),
        Gender: $('#listAPetGender').val(),
        Breed: $('#listAPetBreed').val(),
        EnergyLevel: $('#listAPetEnergy').val(),
        HouseTrained: $('#listAPetHouseTrained').val(),
        Size: $('#listAPetSize').val(),
        Image: $('.PetPicture').prop('src')
      }
    })
    .done(function( result ) {
      console.log(result);
      alert('A dog has been added');
      //window.location.href = "../selection.html";
    })
    .fail(function(xhr, status, errorThrown) {
      console.log(xhr.status);
      console.log('AJAX POST failed...');
      alert('A dog has been added');
      //window.location.href = "../selection.html";
    })
  },
  componentDidMount: function() {
    console.log("componentDidMount");
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleGenderChange: function(e) {
    this.setState({gender: e.target.value});
  },
  handleBreedChange: function(e) {
    this.setState({breed: e.target.value});
  },
  handleEnergyLevelChange: function(e) {
    this.setState({energyLevel: e.target.value});
  },
  handleHouseTrainedChange: function(e) {
    this.setState({houseTrained: e.target.value});
  },
  handleSizeChange: function(e) {
    this.setState({size: e.target.value});
  },
  onFileChange: function() {
    this.readFile;
  },
  backBttn: function() {
    ReactDOM.render(React.createElement(Selection), document.getElementById('login'))
  },
  profileAcct: function() {
    ReactDOM.render(React.createElement(Profile), document.getElementById('login'))
  },

  render: function() {
    console.log("render");
      return (
        <nav id={c.listAPetScreen}>
        <div className={c.menuBar}>
           <Link to="/Selection"><button id={c.backBttnMenu} className={c.smallBlueBttn}>Back</button></Link>
            <Link to="/Profile"><button id={c.myProfileBttnMenu} className={c.smallBlueBttn}>My Profile</button></Link>
        </div>
        <form id={c.listAPetForm} action="/newPet" method="POST">
            <div id={c.listAPetInputs} className={c.blueRoundSquare}>

                <span>
                    <label className={c.formLabel}>Name: </label>
                    <input className={c.formInput} 
                    type="text" name="Name" 
                    placeholder="enter a pet name" 
                    className={c.listAPetName} id="listAPetName" value={this.state.name} 
                    onChange={this.handleNameChange}/>
                </span>

                <span>
                    <label className={c.formLabel}>Gender: </label>
                    <select className={c.formInput} id="listAPetGender" className={c.listAPetGender}
                    defaultValue={this.state.gender} onChange={this.handleGenderChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other ;)</option>
                    </select>
                </span>

                <span>
                    <label className={c.formLabel}>Breed: </label>
                    <select className={c.formInput} id="listAPetBreed" className={c.listAPetBreed}
                    value={this.state.breed} onChange={this.handleBreedChange}>
                        <option value="Labrador">Labrador</option>
                        <option value="Great_Dane">Great Dane</option>
                        <option value="Poodle">Poodle</option>
                        <option value="Husky">Husky</option>
                        <option value="German_Shepherd">German Shepherd</option>
                        <option value="Pug">Pug</option>
                    </select>
                </span>

                <span>
                    <label className={c.formLabel}>Energy Level: </label>
                    <select id="listAPetEnergy" className={c.listAPetEnergy, c.formInput}
                    value={this.state.energyLevel} onChange={this.handleEnergyLevelChange}>
                        <option value="calm">Calm</option>
                        <option value="somewhat_energetic">Somewhat Energetic</option>
                        <option value="really_energetic">Really Energetic</option>
                    </select>
                </span>

                <span>
                    <label className={c.formLabel}>House Trained: </label>
                    <select className={c.formInput} id="listAPetHouseTrained" className={c.listAPetHouseTrained} value={this.state.houseTrained} onChange={this.houseTrained}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select> </span>

                <span>
                    <label className={c.formLabel}>Size: </label>
                    <select className={c.formInput} id="listAPetSize" className={c.listAPetSize} value={this.state.size} onChange={this.handleSizeChange}>
                        <option value="small">Small</option>
                        <option value="mid-sized">Mid-Sized</option>
                        <option value="large">Large</option>
                    </select>
                </span>

                <span>
                    <label className={c.formLabel}>Image: </label>
                    <input id='inp' type='file' onChange={this.readFile}/>
                    <img className="PetPicture" height="150"/> 
                </span>
               
            </div>
            <input id={c.submitPet} type="button" value="Submit" onClick={this.submitPet}/>
        </form>
    </nav>
      )
  }
});
