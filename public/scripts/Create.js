/* Create.js implements the AJAX requests necessary for create.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";
var image;

function readFile() {
  if (this.files && this.files[0]) {
    var FR = new FileReader();

    FR.addEventListener("load", function (e) {
      document.getElementById("img").src = e.target.result;
      image = e.target.result;
    });
    FR.readAsDataURL(this.files[0]);
  }
}

document.getElementById("file").addEventListener("change", readFile);

$(document).ready(function () {


  $("form").submit(function (event) {
    event.preventDefault();
    $.ajax({
        url: '/create',
        type: 'post',
        data: {
          name: $('#createAccountName').val(),
          email: $('#createAccountEmail').val(),
          password: $('#createAccountPassword').val(),
          location: $('#createAccountLocation').val(),
          Image: image
        }
      })
      .done(function (result) {
        // console.log("JSON: " + result[0].loginID);
        if (result.Result == 'Failure') {
          console.log(result);
          alert("That Email has been taken, please choose another");
        } else {
          console.log("JSON: " + result);
          setCookie('PinderloginID', result.loginID, 3);
          setCookie('PinderloginEmail', $('#createAccountEmail').val(), 3);
          setCookie('PinderloginPassword', $('#createAccountPassword').val(), 3);
          console.log("Cookies: " + getCookie('PinderloginID'));
          window.location.href = "../selection.html";
        }
      })
      .fail(function (xhr, status, errorThrown) {
        console.log('AJAX POST failed...');
        alert(xhr + " " +  status);
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