/* index.js
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
// import '../styles/shared.css';

import Login from './Login.js';
import Profile from './Profile.js';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={Login}/>
            <Route path="/Profile" component={Profile}/>
        </Router>
    ), document.getElementById('login')
);


/*
var Dog_Array = [];
var Dogs_Liked = [];
var index = 0;

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Remarkable from 'remarkable';

import "../styles/adopt.css";
import "../styles/list.css";
import "../styles/matches.css";
import "../styles/matchProfile.css";
import "../styles/profile.css";
//import "../styles/shared.css";
import "../styles/style.css";
import "../styles/login.css";

var Login = React.createClass({
    getInitialState: function() {
      console.log("getInitialState");
         return {data: []};
    },
    handleLoginClick: function(loginID,Password) {


      var response;
        console.log("Email: " + loginID);
        console.log("Password: " + Password);
    $.ajax({
            url: "/login",
            type: "POST",
            dataType: 'json',
            data: {
              email: loginID,
              password: Password
            },
      success: function(data) {
                console.log("Result: " + data.loginID);
            if (data.loginID == "Failure") {
                      alert("Incorrect Password or Username");
            } else  {
                    //alert('got the right data');
                    this.setCookie('PinderloginID', data.loginID, 3);
                    this.setCookie('PinderloginEmail', loginID, 3);
                    this.setCookie('PinderloginPassword', Password, 3);
                    console.log("Cookies: " + this.getCookie('PinderloginID'))
                    ReactDOM.render(React.createElement(Selection), document.getElementById('login'))


          }
        }.bind(this),
          error: function(xhr, status, err) {
            console.log("Error Produced!: " + err);
      }.bind(this)
      });
     },
    componentDidMount: function() {
      console.log("componentDidMount");
      //  this.loadCommentsFromServer();
      //  setInterval( this.props.pollInterval);
    },
     handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    setCookie: function(name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
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

    GuestGreeting(props) {
        return <MyImage>Please sign up.</MyImage>;
    },

    createAccount() {
      ReactDOM.render(React.createElement(Create), document.getElementById('login'))
    },

    render: function() {
      console.log(this.state);
      console.log("render");
        return (
           <nav id="loginScreen">
        <img id="pinderLogoMain" src="../images/mainLogoBlue.png" />
        <form id="loginForm" action="/login" method="POST" >
            <div id="loginInputs" className="blueRoundSquare">
                <label id="loginFormTitle">Log In</label>
                <br/>

                <span className="formSpan">
                    <label className="loginFormLabel">Email: </label>
                    <input className="loginFormInput" type="email" placeholder="please enter an email"
                     name="Name" id="loginEmail" 
                     value={this.state.author} onChange={this.handleAuthorChange} />
                </span>

                <span className="formSpan">
                    <label className="loginFormLabel">Password: </label>
                    <input className="loginFormInput"  type="password" 
                    placeholder="please enter a password"  name="Password" value="" id="loginPassword"
                     value={this.state.text} onChange={this.handleTextChange} />
                </span>

                <span id="loginBttns" className="formSpan">
                    <input className="smallGreyBttn" id="loginToAccountBttn"


                    type="button" value="Log In"
                    onClick = {this.handleLoginClick.bind(this, this.state.author,this.state.text)}
                    />
                    <input className="smallGreyBttn" id=""  
                    type="button" value="Create Account"
                    onClick={this.createAccount} />
                </span>
                 </div>
             </form>
      </nav>
 

        )
    }
});

var Selection = React.createClass({
  listaPet: function() {
      ReactDOM.render(React.createElement(List), document.getElementById('login'))
    },
    adoptaPet: function() {
      ReactDOM.render(React.createElement(Adopt), document.getElementById('login'))

    },
    yourMatches: function() {
        ReactDOM.render(React.createElement(DogBox), document.getElementById('login'))
    },
    yourProfile: function() {
        //alert('Your Profile!');
        ReactDOM.render(React.createElement(ProfilePage), document.getElementById('login'))

    },
  render: function() {
    return (
      <nav id="mainScreen">
        <img id="pinderLogoMain" src="../images/mainLogoBlue.png" />
        <div id="bttnContainer">
            <button id="listPetBttn" className="blueBttn" 
            onClick={this.listaPet}> List Pet </button>
            <button id="adoptPetBttn" className='blueBttn' 
            onClick={this.adoptaPet}> Adopt a Pet
            </button>
            <button id="yourMatchesBttn" className='blueBttn' 
            onClick={this.yourMatches}> Your Matches
            </button>
        </div>
        <button id="myProfileBttn" className="smallBlueBttn" 
        onClick={this.yourProfile}> My Profile</button>
    </nav>
      );
  }
});

var ProfilePage = React.createClass({
  getInitialState: function() {
      console.log("myProfile-getInitialState");
      return { name: '',email: '', location: ''};
    },
  componentDidMount: function() {
      console.log("myProfile-componentDidMount");
        this.getProfileInformation();
      //  setInterval( this.props.pollInterval);
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
  getProfileInformation: function() {
      var loginID = this.getCookie("PinderloginID");
        $.ajax({
            url: "/profile",
            type: "POST",
            data: {"ownerID": loginID},
      success: function(data) {
        this.setState({name: data[0].name});
        this.setState({email: data[0].email});
        this.setState({location: data[0].Address});
        // $("#profileNameText").val(data[0].name);
        // $("#profileEmailText").val(data[0].email);
        // $("#profileLocationText").val(data[0].Address);

        //console.log("result: " + result);
        var image = new Image();
        image.src = data[0].ProfilePicture;
        $(".profileImage").attr("src", image.src);

        }.bind(this),
          error: function(xhr, status, err) {
            console.log("Error Produced!: " + err);
      }.bind(this)
      });  
  },
  updateInformation: function() {
      var loginID = this.getCookie("PinderloginID");
       $.ajax({
      url: "/saveProfile",
      type: "POST",
      data: {
        loginID: loginID,
        Name: $('#profileNameText').val(),
        Email: $('#profileEmailText').val(),
        Location: $('#profileLocationText').val()
      }
    })
    .done(function( result ) {
       console.log('AJAX POST succeded...');
      alert('Your changes have been saved');
    })
    .fail(function(xhr, status, errorThrown) {
      console.log('AJAX POST failed...');
    })  
  },
  nameChange: function(e) {
      this.setState({name: e.target.value}); 
    },
  emailChange: function(e) {
      this.setState({email: e.target.value}); 
    },
  locationChange: function(e) {
      this.setState({location: e.target.value}); 
    },
  backBttn: function() {
      ReactDOM.render(React.createElement(Selection), document.getElementById('login'))
    },
  changeAccnt: function() {
      ReactDOM.render(React.createElement(Login), document.getElementById('login'))
    },
  seeMatches: function() {
      ReactDOM.render(React.createElement(DogBox), document.getElementById('login'))
  },
  render: function() {
    return (
       <nav id="profileScreen">
        <div className="menuBar">
            <button id="backBttnMenu" className="smallBlueBttn" 
            onClick={this.backBttn} > Back</button>
            <label id="titleLabel">My Profile</label>
            <button id="myProfileBttnMenu" className="smallBlueBttn"
            onClick={this.changeAccnt} > Change
                Account</button>
        </div>
        <div id="profileImageHolder">
            <img className="profileImage"
            value={this.state.image} onChange={this.imageChange}  />
        </div>
        <div id="profileInputsContainer">
            <div className="profileInputRow">
                <label  htmlFor="profileName">Name: </label>
                <input className="profileInput" type="text" 
                placeholder="enter your name" name="profileName"  
                id="profileNameText"
                value={this.state.name} onChange={this.nameChange}/>
            </div>
            <div className="profileInputRow">
                <label htmlFor="profileContactEmail">Contact Email:</label>
                <input className="profileInput" type="text" 
                placeholder="enter your email" name="profileContactEmail" 
                value="" id="profileEmailText"
                value={this.state.email} onChange={this.emailChange} />
            </div>
            <div className="profileInputRow">
                <label htmlFor="profileLocation">Location:</label>
                <input className="profileInput" type="text" 
                placeholder="enter your city" name="profileLocation" value="" 
                id="profileLocationText"
                value={this.state.location} onChange={this.locationChange} />
            </div>
        </div>
        <div id="profileButtons">
            <button id="myMatchesProfileBttn" 
            className="profileBttn smallBlueBttn"
            onClick={this.seeMatches}  > My Matches</button>
            <button id="saveChangesProfileBttn" 
            className="profileBttn smallGreenBttn" onClick={this.updateInformation}>
             Save Changes</button>
        </div>
    </nav>
      );
  }
});

var Create = React.createClass ({
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

var List = React.createClass({
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
        $('#PetPicture').attr("src",e.target.result ) ;
        console.log("Source Data: " + e.target.result);
        console.log("Img Data: " + $('#PetPicture').prop('src'));
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
   // alert(image);
   // console.log(this.getCookie("PinderloginID") + Name + Gender + Breed + EnergyLevel + HouseTrained + Size);
    $.ajax({
      url: "/newPet",
      type: "POST",
      data: {
        loginID: this.getCookie("PinderloginID"),
        Name: $('#listAPetName').val(),
        Gender: $('#listAPetGender').val(),
        Breed: $('#listAPetBreed').val(),
        EnergyLevel: $('#listAPetEnergy').val(),
        HouseTrained: $('#listAPetHouseTrained').val(),
        Size: $('#listAPetSize').val(),
        Image: $('#PetPicture').prop('src')
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
    ReactDOM.render(React.createElement(ProfilePage), document.getElementById('login'))
  },

  render: function() {
    console.log("render");


      return (
        <nav id='listAPetScreen'>
        <div className="menuBar">
           <button id="backBttnMenu" className="smallBlueBttn" 
            onClick={this.backBttn} > Back</button>
            <button id="myProfileBttnMenu" className="smallBlueBttn"
            onClick={this.profileAcct} > My Profile</button>
        </div>
        <form id="listAPetForm" action="/newPet" method="POST">
            <div id="listAPetInputs" className="blueRoundSquare">

                <span>
                    <label className="formLabel">Name: </label>
                    <input className="formInput" 
                    type="text" name="Name" 
                    placeholder="enter a pet name" 
                    id="listAPetName" value={this.state.name} 
                    onChange={this.handleNameChange}/>
                </span>

                <span>
                    <label className="formLabel">Gender: </label>
                    <select className="formInput" id="listAPetGender" defaultValue={this.state.gender} onChange={this.handleGenderChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other ;)</option>
                    </select>
                </span>

                <span>
                    <label className="formLabel">Breed: </label>
                    <select className="formInput" id="listAPetBreed" value={this.state.breed} onChange={this.handleBreedChange}>
                        <option value="Labrador">Labrador</option>
                        <option value="Great_Dane">Great Dane</option>
                        <option value="Poodle">Poodle</option>
                        <option value="Demon">Demon</option>
                    </select>
                </span>

                <span>
                    <label className="formLabel">Energy Level: </label>
                    <select className="formInput" id="listAPetEnergy" value={this.state.energyLevel} onChange={this.handleEnergyLevelChange}>
                        <option value="calm">Calm</option>
                        <option value="somewhat_energetic">Somewhat Energetic</option>
                        <option value="really_energetic">Really Energetic</option>
                    </select>
                </span>

                <span>
                    <label className="formLabel">House Trained: </label>
                    <select className="formInput" id="listAPetHouseTrained" value={this.state.houseTrained} onChange={this.houseTrained}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select> </span>

                <span>
                    <label className="formLabel">Size: </label>
                    <select className="formInput" id="listAPetSize" value={this.state.size} onChange={this.handleSizeChange}>
                        <option value="small">Small</option>
                        <option value="mid-sized">Mid-Sized</option>
                        <option value="large">Large</option>
                    </select>
                </span>

                <span>
                    <label className="formLabel">Image: </label>
                    <input id="inp" type='file'
                    onChange= {this.readFile}/>
                    <img id="PetPicture" height="150"/> 
                </span>

               
            </div>
            <input id="submitPet" type="button" 
            value="Submit" onClick={this.submitPet}/>
        </form>
    </nav>

      )
  }
});

var DogBox = React.createClass({
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
    ReactDOM.render(React.createElement(ProfilePage), document.getElementById('login'))
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

var DogTable = React.createClass({
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

var Adopt = React.createClass({
    getInitialState: function() {
        console.log("getInitialState");
        return {data: []};
    },
    componentDidMount: function() {
        console.log("componentDidMount");
        this.getAdoptInformation();
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
    getAdoptInformation: function() {
        Dog_Array=[];
        Dogs_Liked = [];
        index = 0;
        
        console.log("getAdoptInformation");
        $.ajax({
            url: "/adopt",
            type: "get",
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    var Dog = {
                        "Name": data[i].Name,
                        "Gender": data[i].Gender,
                        "DogID": data[i].id,
                        "Breed": data[i].Breed,
                        "Image": data[i].Image
                    }
                  Dog_Array.push(Dog);
                }

                console.log(Dog_Array);

                $(".adopInfoNameDesc").text(Dog_Array[index].Name);
                $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
                $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

                var image = new Image();
                image.src = Dog_Array[index].Image;
                $(".adoptImage").attr("src", image.src);
              
                console.log("Dog_Array");
            }.bind(this), error: function(xhr, status, err) {
                console.log("Error: " + err);
            }.bind(this)
        });
    },
    handleAdoptClick: function() {
        console.log("handleAdoptClick");
            $.ajax({
                url: "/itsamatch",
                type: "put",
                data: {
                    "loginID": this.getCookie("PinderloginID"),
                    "dogID": Dog_Array[index].DogID
                }
            })
            .done(function (result) {
                console.log("Added to your matches!");
            })
            .fail(function (xhr, status, errorThrown) {
                console.log('AJAX PUT failed...');
            });

        if (Dog_Array.length > 1) {
            var indexToSplice = index;
            Dog_Array.splice(indexToSplice, 1);
            if (Dog_Array[index] == null) {
                index = 0;
            }

            $(".adopInfoNameDesc").text(Dog_Array[index].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

            var image = new Image();
            image.src = Dog_Array[index].Image;
            $(".adoptImage").attr("src", image.src);
        } else {
            alert('You have matched with them all');
        }
    },
    handleRejectClick: function() {
        console.log("handleRejectClick");
        var indexToSplit = index;
        if (Dog_Array.length > 1) {
            indexToSplit = index;
            Dog_Array.splice(indexToSplit, 1);
            if (Dog_Array[index] == null) {
                index = 0;
            } else {

            }
            $(".adopInfoNameDesc").text(Dog_Array[index].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

            var image = new Image();
            image.src = Dog_Array[index].Image;
            $(".adoptImage").attr("src", image.src);
        } else {
            alert("You have already disliked all the dogs");
        }
    },
    handleRightClick: function() {
        console.log("handleRightClick");
        if ((index + 1) > Dog_Array.length - 1) {
            index = 0;
        } else {
            index++;
        }

        $(".adopInfoNameDesc").text(Dog_Array[index].Name);
        $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
        $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

        var image = new Image();
        image.src = Dog_Array[index].Image;
        $(".adoptImage").attr("src", image.src);
    },
    handleLeftClick: function() {
        console.log("handleLeftClick");
        if ((index - 1) < 0) {
            index = Dog_Array.length - 1;
        } else {
            index--;
        }

        $(".adopInfoNameDesc").text(Dog_Array[index].Name);
        $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
        $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

        var image = new Image();
        image.src = Dog_Array[index].Image;
        $(".adoptImage").attr("src", image.src);
    },
    handleBackClick: function() {
        console.log("back button clicked");
        alert("back button clicked");
        // TODO: Redirect to the "Selection" page
        // window.location.href = "../selection";
    },
    handleMyProfileClick: function() {
        console.log("my profile button clicked");
        alert("my profile button clicked");
        // TODO: Redirect to the "My Profile" page
        // window.location.href = "../profile";
    },
     backBttn: function() {
        ReactDOM.render(React.createElement(Selection), document.getElementById('login'))
    },
    profileAcct: function() {
        ReactDOM.render(React.createElement(ProfilePage), document.getElementById('login'))
    },

    render: function() {
        console.log("Render: " + this.state);
        return (
            <nav id="adoptScreen">
            <div className="menuBar">
                 <button id="backBttnMenu" className="smallBlueBttn" 
            onClick={this.backBttn} > Back</button>
            <button id="myProfileBttnMenu" className="smallBlueBttn"
            onClick={this.profileAcct} > My Profile</button>
            </div>
            <div id='adopContainer'>
            <div id="adoptImageHolder">
                <img className="adoptImage"/>
            </div>
            <div id="swipeButtons">
                <img id="rightBttn" src="../images/moveRight.png" onClick={this.handleRightClick.bind(this)}/>
                <img id="leftBttn" src="../images/moveLeft.png" onClick={this.handleLeftClick.bind(this)}/>
            </div>
            <div id="adoptInfoContainer">
            <div className='adoptInfoLine'>
                <span className="adopInfoName">Name: </span>
                <span className="adopInfoNameDesc"></span>
            </div>
            <br/>
                <div className='adoptInfoLine'>
                <span className="adopInfoBreed">Breed:</span>
                <span className="adopInfoBreedDesc"></span>
            </div>
            <br/>
            <div className='adoptInfoLineLast'>
                <span className="adopInfoGender">Gender:</span>
                <span className="adopInfoGenderDesc"></span>
            </div>
            </div>
            <div id="adoptButtonContainer">
                <img src="../images/xout.png" id="xoutButton" onClick={this.handleRejectClick.bind(this)}/>
                <img src="../images/greenHeart.png" id="heartButton" onClick={this.handleAdoptClick.bind(this)}/>
            </div>
            </div>
            </nav>
        )
    }
});



ReactDOM.render(
    <Login pollInterval={2000}/>,
    document.getElementById('login')
);
*/