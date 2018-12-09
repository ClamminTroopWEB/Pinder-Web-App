/* List.js implements the AJAX requests necessary for list.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

var List = React.createClass({
  getInitialState: function() {
      return {data: []};
  },
  readFile: function() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      
      FR.addEventListener("load", function(e) {
        document.getElementById("img").src = e.target.result;
        image = e.target.result;
      }); 
      FR.readAsDataURL(this.files[0]);
    }
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
  submitPet: function(Name, Gender, Breed, EnergyLevel, HouseTrained, Size) {
    console.log(this.getCookie("PinderloginID") + Name + Gender + Breed + EnergyLevel + HouseTrained + Size);
    $.ajax({
      url: "/newPet",
      type: "POST",
      data: {
        loginID: getCookie("PinderloginID"),
        Name: Name,
        Gender: Gender,
        Breed: Breed,
        EnergyLevel: EnergyLevel,
        HouseTrained: HouseTrained,
        Size: Size,
        Image: image
      }
    })
    .done(function( result ) {
      console.log(result);
      alert('A dog has been added');
      window.location.href = "../selection.html";
    })
    .fail(function(xhr, status, errorThrown) {
      console.log('AJAX POST failed...');
      alert('A dog has been added');
      window.location.href = "../selection.html";
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
    var image;

      return (
        <nav id='listAPetScreen'>
        <div className="menuBar">
            <button id="backBttnMenu" className="smallBlueBttn"> Back</button>
            <img id="pinderLogoMain" src="./images/mainLogoBlue.png" />
            <button id="myProfileBttnMenu" className="smallBlueBttn" > My
                Profile</button>
        </div>
        <form id="listAPetForm" action="/newPet" method="POST">
            <div id="listAPetInputs" className="blueRoundSquare">

                <span>
                    <label className="formLabel">Name: </label>
                    <input className="formInput" type="text" name="Name" placeholder="enter a pet name" id="listAPetName" value={this.state.name} onChange={this.handleNameChange}/>
                </span>

                <span>
                    <label className="formLabel">Gender: </label>
                    <select className="formInput" id="listAPetGender" value={this.state.gender} onChange={this.handleGenderChange}>
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
                    <input className="fileInput" type="file" id="file" name="avatar" onChange={this.onFileChange} />
                </span>

                <span>
                    <img id="img"/>
                </span>
            </div>
            <input id="submitPet" text="List the Pet" type="button" value="Submit" onClick={this.submitPet.bind(this, this.state.name,this.state.gender,this.state.breed,this.state.energyLevel,this.state.houseTrained,this.state.size)}/>
        </form>
    </nav>
      )
  }
});




ReactDOM.render(
    <List pollInterval={2000}/>,
    document.getElementById('listAPet')
);


/*

function readFile() {
  if (this.files && this.files[0]) {
    var FR = new FileReader();
    
    FR.addEventListener("load", function(e) {
      document.getElementById("img").src = e.target.result;
      image = e.target.result;
    }); 
    FR.readAsDataURL(this.files[0]);
  }
}*/ 

//document.getElementById("file").addEventListener("change", this.readFile);
/*
$(document).ready(function () {
  $('form').submit(function(event) {
    $("p").remove();
    event.preventDefault();
    //  console.log(getCookie(PinderloginID));

    $.ajax({
      url: "/newPet",
      type: "POST",
      data: {
        loginID: getCookie("PinderloginID"),
        Name: $('#listAPetName').val(),
        Gender: $('#listAPetGender').find(":selected").text(),
        Breed: $('#listAPetBreed').find(":selected").text(),
        EnergyLevel: $('#listAPetEnergy').find(":selected").text(),
        HouseTrained: $('#listAPetHouseTrained').find(":selected").text(),
        Size: $('#listAPetSize').find(":selected").text(),
        Image: image
      }
    })
    .done(function( result ) {
      console.log(result);
      alert('A dog has been added');
      window.location.href = "../selection.html";
    })
    .fail(function(xhr, status, errorThrown) {
      console.log('AJAX POST failed...');
      alert('A dog has been added');
      window.location.href = "../selection.html";
    })
  });
}); 
*/
/*
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
} */
