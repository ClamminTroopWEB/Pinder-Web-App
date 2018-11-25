var pictureImage;

function readFile() {
  
  if (this.files && this.files[0]) {
    
    var FR= new FileReader();
    
    FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      pictureImage = e.target.result;
      console.log(e.target.result);
      document.getElementById("b64").innerHTML = e.target.result;
    }); 
    
    FR.readAsDataURL( this.files[0] );
  }
  
}

document.getElementById("file").addEventListener("change", readFile);

$(document).ready(function () {
  $( 'form' ).submit(function( event ) {
   $( "p" ).remove();
   event.preventDefault();
  //  console.log(getCookie(PinderloginID));


   $.ajax({
  url: "/newPet",
  type: "POST",
  data: 
  {
    loginID: getCookie("PinderloginID"),
    Name: $('#listAPetName').val(),
    Gender:$('#listAPetGender').find(":selected").text(),
    Breed: $('#listAPetBreed').find(":selected").text(),
    EnergyLevel: $('#listAPetEnergy').find(":selected").text(),
    HouseTrained:$('#listAPetHouseTrained').find(":selected").text(),
    Size:$('#listAPetSize').find(":selected").text(),
    Image:pictureImage
  }
  })
  .done(function( result ) {
      $("body").append("<p>Dog has been published to our database!</p>");
    })
    .fail(function(xhr, status, errorThrown) {
       console.log('AJAX POST failed...');
            $("body").append("<p>Dog was NOT published into the database!</p>");
         })
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