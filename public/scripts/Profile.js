/* profile.js
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

$(document).ready(function () {
  $.ajax({
    url: "/profile",
    type: "POST",
    data: {
      "ownerID":getCookie("PinderloginID")
    }
  })
  .done(function( result ) {
    $("#profileNameText").val("Professor Prium");
    $("#profileEmailText").val(result[0].email);
    $("#profileLocationText").val(result[0].Address);

    console.log("result: " + result);
    var image = new Image();
    image.src = result[0].ProfilePicture;
    $(".profileImage").attr("src", image.src);
  })
  .fail(function(xhr, status, errorThrown) {
     console.log('AJAX POST failed...');
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
