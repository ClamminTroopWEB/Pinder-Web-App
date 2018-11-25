var Email;
$(document).ready(function () {

  $( 'form' ).submit(function( event ) {

  $( "p" ).remove();
  event.preventDefault();

   $.ajax({
  url: "/login",
  type: "post",
  data: 
  { 
    Username: $('#loginEmail').val(),
    Password: $('#loginPassword').val()
  }
  })
  .done(function( result ) {
  	console.log("JSON: " + result[0].loginID);
      if (result[0].loginID != "Failure")
      {
        setCookie('PinderloginID',result[0].loginID, 3);
      	setCookie('PinderloginEmail',$('#loginEmail').val(), 3);
        setCookie('PinderloginPassword',$('#loginPassword').val(), 3);
        console.log("Cookies: " + getCookie('PinderloginID'));

        window.location.href = "../selection.html";
      } 
        else if (result[0].ownerID === "Failure") 
      {
        console.log("Failure");
      	alert("Incorrect Password or Username");
      }

    })
	.fail(function(xhr, status, errorThrown) {
	console.log('AJAX POST failed...');
	 })
	});
});



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