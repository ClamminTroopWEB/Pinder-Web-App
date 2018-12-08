"use_strict";

// import React from 'react';
// //import ReactDOM from 'react-dom';
// import $ from 'jquery';
//ar that = this.state;
//import '../styles/login.css';


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
       		//console.log("Result: " + data.Result);
       		//console.log("ID: " + data.loginID);
       			if (data.Result == "Failure") {
         			 alert("Incorrect Password or Username");
        		} else  {
			      setCookie('PinderloginID', data.loginID, 3);
			      setCookie('PinderloginEmail', loginID, 3);
			      setCookie('PinderloginPassword', Password, 3);
                  console.log("Cookies: " + getCookie('PinderloginID'))
                  alert('got the right data');
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


    render: function() {
    	console.log(this.state);
    	console.log("render");
        return (
        	 <nav id="loginScreen">
        <img id="pinderLogoMain" src="./images/mainLogoBlue.png" />
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


                    type="submit" value="Log In"
                    onClick = {this.handleLoginClick.bind(this,this.state.author,this.state.text)}
                    />
                    <input className="smallGreyBttn" id=""  type="button" value="Create Account" />
                </span>
           			 </div>
       			 </form>
			</nav>
 

        )
    }
});



ReactDOM.render(
    <Login pollInterval={2000}/>,
    document.getElementById('login')
);
