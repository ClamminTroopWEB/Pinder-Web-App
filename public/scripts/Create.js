/* Create.js implements the AJAX requests necessary for create.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: '/create',
      type: 'post',
      data: {
        loginID: Date.now(),
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val(),
      },
    })
    .done(function(result) {
      window.location.href = "../selection.html";
    })
  	.fail(function(xhr, status, errorThrown) {
  	 console.log('AJAX POST failed...');
  	});
  });
});
