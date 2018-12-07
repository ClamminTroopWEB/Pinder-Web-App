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

function deleteDog (dogID,personID)
{
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
}

var DogBox = React.createClass({
  loadDogsFromServer: function() {
    var personID = getCookie("PinderloginID");
   $.ajax({
  	  url: "/matches",
      dataType: 'json',
      type: 'post',
      data: { "loginID": personID },
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
      <table>  
        <DogTable data={this.state.data} />
      </table>
    );
  }
});



var DogTable = React.createClass({
 nameSomething123Dogs: function(e) {
    var personID = getCookie("PinderloginID");
    var dogID = e.id;
    deleteDog(dogID,personID);

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


ReactDOM.render(
  <DogBox url="/matches" pollInterval={15000}/>,
   document.getElementById('matchesTableBackground')
);
