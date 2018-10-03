//giphy API key iROsCNPKvZ3parYmVXiCRo62MTMWjEXP

var searchTerm = "dog";
var loopingArray = [];
var stillArray = [];
$(document).ready(function(){
//async request
    
function AJAXrequest(ajaxSearch){

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ajaxSearch + "&api_key=iROsCNPKvZ3parYmVXiCRo62MTMWjEXP&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        
        //stores original and still gif, need to clear array when pushing another button
        for(i=0; i<10; i++){
        loopingArray.push(response.data[i].images.downsized.url);
        stillArray.push(response.data[i].images.original_still.url);
        addToPage(loopingArray[i]);
        console.log(loopingArray[i]);
        }
        //empties array so you can pull up the next item
        loopingArray = [];
        
    });
    //adds the gifs to the page after the ajax request is done

}

//creates buttons for each search
function renderButton(searchWord){
    var a = $("<button>");
    a.addClass("animal");
    a.attr("data-name", searchWord);
    a.text(searchWord);
    $("#button-view").append(a);
}

function addToPage(animateToAdd){
    var gifDiv = $("<div>");
    var animalImage = $("<img>");
    
    
    animalImage.attr("src", animateToAdd);
    animalImage.attr("animate", animateToAdd);
    animalImage.attr("data-state", "animate");
    gifDiv.append(animalImage);
    $("#gifs-here").prepend(gifDiv);
    console.log("add to page: " + animateToAdd);
    
}

function resetDiv(){
    $("#gifs-here").empty();

}

$("#add-button").on("click", function(event){

    event.preventDefault();
    var inputSearch = $("#search-input").val().trim();
    //make a button function
    console.log(inputSearch);
    renderButton(inputSearch);

});

$(document).on("click", ".animal", function(){

    var searchJax = $(this).attr("data-name");
    resetDiv();
    AJAXrequest(searchJax);
});







});//document ready bracket