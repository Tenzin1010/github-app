'use strict';
let userHandle = "";

//func GET, throw & catch.
function getHandle(userInput) {
    $('#js-error-message').empty();
    let api = "https://api.github.com/users/";
    let apiKey = api + userInput + '/repos';
    fetch(apiKey)
    .then(response => {
        if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
    })
    .then(responseJson => displayHandle(responseJson))
    //404 error message captured from API displayed to user
    .catch(err => {
      $('#js-error-message').text(`Oops ${err.message}`);
    });
}

//func displays results from user input
function displayHandle(responseJson) {
    console.log(responseJson);
    $('#results').empty();
    for(let i=0; i < responseJson.length; i++)
    $('#results').append(
        `<li><p>Repo name: ${responseJson[i].name}</p>
        <p>Repo link: <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
        </li>`
    )
    $('#results').removeClass('hidden');
}

//event trigger, captures user input and func getHandle gets value
$('form').on('click', '#submit-btn', function(){
    userHandle = $('#handle-txt').val();
    getHandle(userHandle);
    $('#results').empty();
})

//prevents the default behavior of the form
function watchForm() {
    $('form').submit(event=>{
        event.preventDefault()
    });
}
    

$(function() {
    console.log("App ready, waiting for user entry");
    watchForm();
})