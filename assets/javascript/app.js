//giphy API key iROsCNPKvZ3parYmVXiCRo62MTMWjEXP

//Global variables for my own array, array for looping gif link, array for still gif link and array for rating.
var hadiArray = ['bear', 'cat', 'dog', 'shark', 'lion', 'tiger', 'elephant', 'lizard', 'bird', 'fish', 'alligator'];
var loopingArray = [];
var stillArray = [];
var ratingArray = [];


//loads page first then jquery/javascript
$(document).ready(function(){

//async request
//Function performs an Ajax request by passing through the search term based on which button is clicked.    
function AJAXrequest(ajaxSearch){

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ajaxSearch + "&api_key=iROsCNPKvZ3parYmVXiCRo62MTMWjEXP&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        
        //stores original gif, still giff and rating in arrays.
        for(i=0; i<10; i++){
        loopingArray.push(response.data[i].images.downsized.url);
        stillArray.push(response.data[i].images.downsized_still.url);
        ratingArray.push(response.data[i].rating);
        addToPage(loopingArray[i], stillArray[i], ratingArray[i]);
        }
        //empties array so the next button click puts up new search results.
        loopingArray = [];
        stillArray = [];
        ratingArray = []; 
    });
}

//Creates a button for each term searched.
function renderButton(searchWord){
    var a = $("<button>");
    a.addClass("animal");
    a.attr("data-name", searchWord);
    a.text(searchWord);
    $("#button-view").append(a);
}

//Creates buttons for the default buttons.
function defaultButton(){
    for(i=0; i<hadiArray.length; i++){
        renderButton(hadiArray[i]);
    }
}

//Adds the gif to page with the correct src and attributes for pause and play click
function addToPage(animateToAdd, stillToAdd, ratingToAdd){
    var gifDiv = $("<div>");
    var animalImage = $("<img>");
    var rating = $("<p>");
    
    rating.text("Rating: " + ratingToAdd);
    animalImage.attr("src", stillToAdd);
    animalImage.attr("animate", animateToAdd);
    animalImage.attr("still", stillToAdd);
    animalImage.attr("data-state", "still");
    animalImage.addClass("giffy");
    gifDiv.append(animalImage);
    gifDiv.append(rating);
    $("#gifs-here").prepend(gifDiv);  
}

//resets the gif div, used for new button clicks
function resetDiv(){
    $("#gifs-here").empty();
}

//add button function
$("#add-button").on("click", function(event){
    event.preventDefault();
    var inputSearch = $("#search-input").val().trim();
    //make a button function
    console.log(inputSearch);
    renderButton(inputSearch);
});

//used to search based on button clicked.
$(document).on("click", ".animal", function(){

    var searchJax = $(this).attr("data-name");
    resetDiv();
    AJAXrequest(searchJax);
});

//click function to change the gif from pause to unpause.  Need to fix sizing.
$(document).on("click", ".giffy", function(){

    var state = $(this).attr("data-state");

    if(state == "animate"){
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("data-state", "still");
    }
    else{
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("data-state", "animate");
    }

});

//Posts initial default buttons to page
defaultButton();

});//document ready bracket