const userFormEl = document.querySelector('#searchForm');
const searchInputEL = document.querySelector('#search-input');
const APIKey = "AIzaSyBdUapgfOCqEn7oB43ozOJj7MWwKriUruA";
const clientID = "124008613381-hrh64fb94g4elkr14tsabe326nk4slku.apps.googleusercontent.com";
const clientSecret = "fsLV_VYmhWVi9tcoYMU6NwuN";
const searchBtn = $("#search-btn");



gapi.load("client", loadClient);
  
function loadClient() {
    gapi.client.setApiKey(APIKey);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}


  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "q": "paint it black"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
 
 /*$(document).ready (function (){
    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: clientID});
        authenticate().then(loadClient)
      });*/
    
  userFormEl.addEventListener("click",execute)
  


searchBtn.on("click",)