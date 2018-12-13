/* List.js implements the react component for the List route
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
    reader.onload = function(e)  {
        $('.PetPicture').attr("src",e.target.result ) ;
        console.log("Source Data: " + e.target.result + "\nImg Data: " + $('.PetPicture').prop('src'));
     }
     reader.readAsDataURL(file);
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
  submitPet: function() {
    $.ajax({
      url: "/newPet",
      type: "post",
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
    })
    .fail(function(xhr, status, errorThrown) {
      console.log(xhr.status + 'AJAX POST failed...');
      alert('A dog has been added');
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
  render: function() {
    console.log("render");
      return (
        <nav id={c.listAPetScreen}>
        <div className={c.menuBar}>
           <Link to="/Selection"><button id={c.backBttnMenu} className={c.smallBlueBttn}>Back</button></Link>
            <Link to="/Profile"><button id={c.myProfileBttnMenu} className={c.smallBlueBttn}>My Profile</button></Link>
        </div>
        <form id={c.listAPetForm} action="/newPet" method="post">
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
                    </select>
                </span>
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
