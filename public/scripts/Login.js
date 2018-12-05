/* Login.js implements the AJAX requests necessary for index.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

$(document).ready(function () {
  $('form').submit(function (event) {
    event.preventDefault();

    $.ajax({
        url: "/",
        type: "post",
        data: {
          email: $('#loginEmail').val(),
          password: $('#loginPassword').val()
        }
      })
      .done(function (result) {
        console.log(result.Result);
        //console.log("JSON: " + result[0].loginID);
        if (result.Result == "Failure") {
          console.log("Failure");
          alert("Incorrect Password or Username");
        } else if (result[0].loginID != "Failure") {
          setCookie('PinderloginID', result[0].loginID, 3);
          setCookie('PinderloginEmail', $('#loginEmail').val(), 3);
          setCookie('PinderloginPassword', $('#loginPassword').val(), 3);
          console.log("Cookies: " + getCookie('PinderloginID'));
          window.location.href = "../selection.html";
        }
      })
      .fail(function (xhr, status, errorThrown) {
        console.log('AJAX POST failed...');
        alert('some went wrong with the login');
      });
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