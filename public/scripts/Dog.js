/* Dog.js implements the AJAX requests necessary for dog.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

//
const DogTable = React.createClass({
  render: function() {
    const dogNodes = this.props.data.map(function(dog) {
      return (
        <Dog name={dog.name} key={dog.id}>
          <td>{dog.name}</td>
          <td>{dog.gender}</td>
          <td>{dog.breed}</td>
          <td>{dog.image}</td>
        </Dog>
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
  <DogBox url="/matches" pollInterval={2000} />,
  document.getElementById('matchesTable')
);
