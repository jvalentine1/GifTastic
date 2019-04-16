// Global Variables
var topics = ["the lion king", "the jungle book", "tommy boy", "aquaman", "iron man", "bumblebee"];
var apiKey = "yQyKmMNilkbOD8useAuNjnrGpiiwrqyk";

//this function calls the api and then cycles through the data array and creates and populates elements
function showGif(){

var movie = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=" + apiKey + "&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    
    var results = response.data
    var gifDiv = $("<div>");

    for (var j = 0; j < 10; j++) {
        var newSpan = $("<span>");
        newSpan.addClass("span-float");

        var p1 = $("<p>");
        p1.addClass("p");
        p1.text("Rating: " + results[j].rating);

        newSpan.append(p1);

        var imageGif = $("<img>").attr("src", results[j].images.fixed_height_still.url);
        imageGif.attr("data-animate", results[j].images.fixed_height.url);
        imageGif.attr("data-still", results[j].images.fixed_height_still.url);
        imageGif.attr("data-state", "still");
        imageGif.addClass("gif");
        newSpan.append(imageGif);

        gifDiv.append(newSpan);

    }
    
    $("#gif-center").prepend(gifDiv);
});
}

//this function recieves an on-click of a gif and switches the source to or from the animated version
$(document).on("click", ".gif", function() {
    console.log("test");
    var state = $(this).attr("data-state");
    
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// the initial function that populates the default buttons from the topics array
function renderButtons() {
    
    $(".button-host").empty();
    $(".movie-input").val("");

for (var i = 0; i < topics.length; i++) {
        
    var buttonDiv = $("<div>");
    var pageButton = $("<button>");
    
    pageButton.attr("data-name", topics[i]);
    pageButton.text(topics[i]);
    pageButton.addClass("movie-buttons");
    buttonDiv.append(pageButton);
    
    $(".button-host").append(buttonDiv);
}
}

$("#add-movie").on("click", function(event){

    event.preventDefault();

    var newMovie = $(".movie-input").val().trim();

    topics.push(newMovie);

    renderButtons();
});

//this function calls the api function
$(document).on("click", ".movie-buttons", showGif);

//calls the first render
renderButtons();


