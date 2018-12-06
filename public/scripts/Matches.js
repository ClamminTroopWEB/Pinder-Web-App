/* Dog.js implements the React necessary for dog.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

// "use_strict";

// var loginID = getCookie("PinderloginID");
// $(document).ready(function() {
//     $(".matchRow").click(function () {
//         var clickedBttnElement = $(this); // or var clickedBtnID = this.id
//         alert('clickedBttnElement: ' + clickedBttnElement);
//         window.location.href = './pet.html'
//     });
// });
//alert(getCookie('PinderloginID'));

$(document).ready(function() {
  $.ajax({
    url: "/matches",
    type: "POST",
    data: {
      loginID: getCookie("PinderloginID")
    }
  })
  .done(function(result) {
        console.log(result);
        alert(result);
  })
  .fail(function(xhr, status, errorThrown) {
     console.log('AJAX POST failed:' + errorThrown + " " + status);
      alert('got a failure');
  });
});

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

/*
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
        <DogTable data={this.state.data} />
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
        <h1 className="dogName">
          {this.props.name}
        </h1>
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
*/