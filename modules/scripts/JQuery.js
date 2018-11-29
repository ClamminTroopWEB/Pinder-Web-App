/* shared.js
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

$(document).ready(function () {
    $(".matchRow").click(function () {
        var clickedBttnElement = $(this); // or var clickedBtnID = this.id
        alert('clickedBttnElement: ' + clickedBttnElement);
        window.location.href = './matchProfile.html'
    });
});
