$(document).ready(function () {

    $(".matchRow").click(function () {
        var clickedBttnElement = $(this); // or var clickedBtnID = this.id
        alert('clickedBttnElement: ' + clickedBttnElement);
        window.location.href = './matchProfile.html'
    });

});