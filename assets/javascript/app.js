//giphy API key iROsCNPKvZ3parYmVXiCRo62MTMWjEXP



var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=iROsCNPKvZ3parYmVXiCRo62MTMWjEXP&limit=10";
var searchTerm = "dogs";

$(document).ready(function(){
//async request
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);

    });

});//document ready bracket