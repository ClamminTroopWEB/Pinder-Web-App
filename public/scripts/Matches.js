/* Dog.js implements the React necessary for dog.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

// $(document).ready(function() {
//     $(".matchRow").click(function () {
//         var clickedBttnElement = $(this); // or var clickedBtnID = this.id
//         alert('clickedBttnElement: ' + clickedBttnElement);
//         window.location.href = './pet.html'
//     });
// });

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
const DogTable = React.createClass({
  render: function() {
    const dogNodes = this.props.data.map(function(dog) {
      return (
        <tr key={dog.id}>
        	<td class="matchType">Dog</td>
    			<td class="matchImage">{dog.image}</td>
    			<td class="matchName">{dog.name}</td>
    			<td class="matchBreed">{dog.breed}</td>
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
ReactDOM.render(
  <DogBox url="/matches.html" pollInterval={2000} />,
  document.getElementById('matchesTable')
);
