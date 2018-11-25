

$(document).ready(function () {
    console.log(document.cookie);
    var Dog_Array =[];
    var Dogs_Liked =[];
    var index = 0;

   $.ajax({
  url: "/adoptaPet",
  type: "GET"
  })
  .done(function( result ) {
    for (i=0; i<result.length;i++)
    {
        var Dog= {
        Name:result[i].Name,
        Gender:result[i].Gender,
        DogID:result[i].id,
        Breed:result[i].Breed,
        Image:result[i].Image
        }
      //  console.log(result)
       // console.log(Dog);
        Dog_Array.push(Dog);

    }

    $(".adopInfoNameDesc").text(Dog_Array[index].Name);
    $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
    $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

    var image = new Image();
    image.src = Dog_Array[index].Image;
    $(".adoptImage").attr("src", image.src);

    console.log("Dog_Array");


    })
    .fail(function(xhr, status, errorThrown) {
       console.log('AJAX POST failed...');
    })
      


    $("#heartButton").click(function () {
        console.log("SUP: "+ Dog_Array[index].DogID);
          $.ajax({
            url: "/itsamatch",
            type: "POST",
            data: {
                "ownerID":getCookie("PinderloginID"),
                "dogID": Dog_Array[index].DogID
            }
            })
        .done(function( result ) {
            console.log("Added to your matches!");
        })
        .fail(function(xhr, status, errorThrown) {
            console.log('AJAX POST failed...');
        })


       

        if (Dog_Array[index-1] != null)
        {   
            $(".adopInfoNameDesc").text(Dog_Array[index-1].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index-1].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index-1].Gender);

            var image = new Image();
            image.src = Dog_Array[index-1].Image;
            $(".adoptImage").attr("src", image.src);

            Dog_Array.splice(index);
        }
        else {
            $(".adopInfoNameDesc").text(Dog_Array[index+1].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index+1].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index+1].Gender);

            var image = new Image();
            image.src = Dog_Array[index+1].Image;
            $(".adoptImage").attr("src", image.src);

            Dog_Array.splice(index);
        } 

    });

    $("#xoutButton").click(function () {
    
        if (Dog_Array[index-1] != null)
        {   
            $(".adopInfoNameDesc").text(Dog_Array[index-1].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index-1].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index-1].Gender);

            var image = new Image();
            image.src = Dog_Array[index-1].Image;
            $(".adoptImage").attr("src", image.src);

            Dog_Array.splice(index);
        }
        else {
            $(".adopInfoNameDesc").text(Dog_Array[index+1].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index+1].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index+1].Gender);

            var image = new Image();
            image.src = Dog_Array[index+1].Image;
            $(".adoptImage").attr("src", image.src);

            Dog_Array.splice(index);
        } 


    });

    $("#rightBttn").click(function () {
      //  alert('Right Button: Add code to move between dogs within the database');
       index++;

        $(".adopInfoNameDesc").text(Dog_Array[index].Name);
        $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
        $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

        var image = new Image();
        image.src = Dog_Array[index].Image;
        $(".adoptImage").attr("src", image.src);

    });

    $("#leftBttn").click(function () {
      //  alert('Left Button: Add code to move between dogs within the database');
        index --;
        $(".adopInfoNameDesc").text(Dog_Array[index].Name);
        $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
        $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

        var image = new Image();
        image.src = Dog_Array[index].Image;
        $(".adoptImage").attr("src", image.src);

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