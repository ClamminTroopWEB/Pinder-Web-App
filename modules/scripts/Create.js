/* login.js
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

$(document).ready(function() {
  let form = $("form");
  form.submit(function(event) {
    $("p").remove();
    event.preventDefault();

    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
    })
    .done(function(result) {
      window.location.href = "../selection.html";
    })
  	.fail(function(xhr, status, errorThrown) {
  	 console.log('AJAX POST failed...');
  	});
  });
});
