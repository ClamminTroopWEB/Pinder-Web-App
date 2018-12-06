/* Adopt.js implements the AJAX requests necessary for adopt.html
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

$(document).ready(function () {
    console.log(document.cookie);
    var Dog_Array = [];
    var Dogs_Liked = [];
    var index = 0;

    $.ajax({
            url: "/adopt",
            type: "GET"
        })
        .done(function (result) {
            for (i = 0; i < result.length; i++) {
                var Dog = {
                    Name: result[i].Name,
                    Gender: result[i].Gender,
                    DogID: result[i].id,
                    Breed: result[i].Breed,
                    Image: result[i].Image
                }
                // console.log(result)
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
        .fail(function (xhr, status, errorThrown) {
            console.log('AJAX POST failed...');
        });

    $("#heartButton").click(function () {
        //console.log("SUP: " + Dog_Array[index].DogID);
        $.ajax({
                url: "/itsamatch",
                type: "PUT",
                data: {
                    "loginID": getCookie("PinderloginID"),
                    "dogID": Dog_Array[index].DogID
                }
            })
            .done(function (result) {
                console.log("Added to your matches!");
            })
            .fail(function (xhr, status, errorThrown) {
                console.log('AJAX PUT failed...');
            });

        if (Dog_Array.length > 1) {
            var indexToSplice = index;
            Dog_Array.splice(indexToSplice, 1);
            if (Dog_Array[index] == null) {
                index = 0;
            }

            $(".adopInfoNameDesc").text(Dog_Array[index].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

            var image = new Image();
            image.src = Dog_Array[index].Image;
            $(".adoptImage").attr("src", image.src);
        } else {
            alert('You have matched with them all');
        }
    });

    $("#xoutButton").click(function () {
        var indexToSplit = index;
        if (Dog_Array.length > 1) {
            indexToSplit = index;
            Dog_Array.splice(indexToSplit, 1);
            if (Dog_Array[index] == null) {
                index = 0;
            } else {
                //index++;
            }
            $(".adopInfoNameDesc").text(Dog_Array[index].Name);
            $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
            $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

            var image = new Image();
            image.src = Dog_Array[index].Image;
            $(".adoptImage").attr("src", image.src);
        } else {
            alert("You have already disliked all the dogs");
        }
    });

    $("#rightBttn").click(function () {
        //  alert('Right Button: Add code to move between dogs within the database');
        if ((index + 1) > Dog_Array.length - 1) {
            index = 0;
        } else {
            index++;
        }

        $(".adopInfoNameDesc").text(Dog_Array[index].Name);
        $(".adopInfoBreedDesc").text(Dog_Array[index].Breed);
        $(".adopInfoGenderDesc").text(Dog_Array[index].Gender);

        var image = new Image();
        image.src = Dog_Array[index].Image;
        $(".adoptImage").attr("src", image.src);
    });

    $("#leftBttn").click(function () {
        //  alert('Left Button: Add code to move between dogs within the database');
        if ((index - 1) < 0) {
            index = Dog_Array.length - 1;
        } else {
            index--;
        }

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