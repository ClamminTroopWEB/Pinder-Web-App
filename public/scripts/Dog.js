/* Dog.js implements the AJAX requests necessary for dog.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

const DogForm = React.createClass({
  getInitialState: function() {
    return {name: '', gender: '', breed: '', energyLevel: '', houseTrained: '', size: '', image: ''}
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
  handleImageChange: function(e) {
    this.setState({image: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let gender = this.state.gender.trim();
    let breed = this.state.breed.trim();
    let energyLevel = this.state.energyLevel.trim();
    let houseTrained = this.state.houseTrained.trim();
    let size = this.state.size.trim();
    let image = this.state.image.trim();
    if (!name || !gender || !breed || !energyLevel || !houseTrained || !size || !image) {
      return;
    }
    this.props.onDogSubmit({name, gender, breed, energyLevel, houseTrained, size, image});
    this.setState({name: '', gender: '', breed: '', energyLevel: '', houseTrained: '', size: '', image: ''});
  },
  render: function() {
    return (
      <form className="dogForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleNameChange}/>
        <input
          type="text"
          placeholder="Gender"
          value={this.state.gender}
          onChange={this.handleGenderChange}/>
        <input
          type="text"
          placeholder="Breed"
          value={this.state.breed}
          onChange={this.handleBreedChange}/>
        <input
          type="text"
          placeholder="Energy Level"
          value={this.state.energyLevel}
          onChange={this.handleEnergyLevelChange}/>
        <input
          type="text"
          placeholder="House Trained"
          value={this.state.houseTrained}
          onChange={this.handleHouseTrainedChange}/>
        <input
          type="text"
          placeholder="Size"
          value={this.state.size}
          onChange={this.handleSizeChange}/>
        <input
          type="image"
          value={this.state.image}
          onChange={this.handleImageChange}/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

//
const DogTable = React.createClass({
  render: function() {
    const dogNodes = this.props.data.map(function(dog) {
      return (
        <tr name={dog.name} key={dog.id}>
          <td>{dog.name}</td>
          <td>{dog.gender}</td>
          <td>{dog.breed}</td>
          <td>{dog.image}</td>
        </tr>
      );
    });
    return (
      <div className="dogTable">
        {dogNodes}
      </div>
    );
  }
});

//
const Dog = React.createClass({
  render: function() {
    return (
      <div className="dog">
        <h2 className="dogName">
          {this.props.name}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

//
const DogBox = React.createClass({
  loadDogsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDogSubmit: function(dog) {
    let dogs = this.state.data;
    let newDogs = dogs.concat([dog]);
    this.setState({data: newDogs});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'post',
      data: dog,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: dogs});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDogsFromServer();
    setInterval(this.loadDogsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="dogBox">
        <h1>Dogs</h1>
        <DogTable data={this.state.data} />
        <DogForm onDogSubmit={this.handleDogSubmit} />
      </div>
    );
  }
});

//
ReactDOM.render(
  <DogBox url="/matches.html" pollInterval={2000} />,
  document.getElementById('matchesTable')
);
