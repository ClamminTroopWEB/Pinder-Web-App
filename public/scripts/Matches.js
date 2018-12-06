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

//console.log("hi");
var DogBox = React.createClass({
  loadDogsFromServer: function() {
  	var personID = getCookie("PinderloginID");
   $.ajax({
  	  url: "/matches",
       dataType: 'json',
      type: 'POST',
      data: {"loginID":personID },
      //cache: false,
      success: function(data) {
      	//console.log("1");
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
	});
  },
  getInitialState: function() {
  	console.log(getCookie("PinderloginID"));
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDogsFromServer();
    setInterval(this.loadDogsFromServer, this.props.pollInterval);
  },
  render: function() {
   // console.log("hfelo");
    return (
      <div>  
           <DogTable data={this.state.data} />
      </div>
    );
  }
});


var DogTable = React.createClass({
  render: function() {
    const dogNodes = this.props.data.map(function(dog) {
      return (
        <tr key={dog.id}>
        	<td class="matchType">Dog</td>
    			<td class="matchImage">{dog.Image}</td>
    			<td class="matchName">{dog.Name}</td>
    			<td class="matchBreed">{dog.Breed}</td>
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


var Dog = React.createClass({
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


ReactDOM.render(

  <DogBox url="/matches" pollInterval={2000} />,
   document.getElementById('matchesTable')
);
