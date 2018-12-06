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
  render: function() {
    const dogNodes = this.props.data.map(function(dog) {
      return (
        <tr key={dog.id}>
          <td className="matchBreed">{dog.Breed}</td>
    			<td className="matchName">{dog.Name}</td>
          <td className="matchImage"><img src={dog.Image}/></td>
        </tr>
      );
    });
    return (
      <tbody className="dogTable">
        {dogNodes}
      </tbody>
    );
  }
});

var Dog = React.createClass({
  render: function() {
    return (
      <tr className="dog">
        {this.props.children}
      </tr>
    );
  }
});

ReactDOM.render(
  <DogBox url="/matches" pollInterval={2000}/>,
   document.getElementById('matchesTableBackground')
);
