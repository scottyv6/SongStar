const APIKey = "AIzaSyBdUapgfOCqEn7oB43ozOJj7MWwKriUruA";
//const clientID = "124008613381-hrh64fb94g4elkr14tsabe326nk4slku.apps.googleusercontent.com";
//const clientSecret = "fsLV_VYmhWVi9tcoYMU6NwuN";
const userFormEl = document.getElementById("search-btn");
const songListEl = document.getElementById("song-list");


gapi.load("client", loadClient);
  
function loadClient() {
    gapi.client.setApiKey(APIKey);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}


  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute(event) {
      event.preventDefault();
    var searchParam = document.getElementById("search-input").value;
    return gapi.client.youtube.search.list({
      "q": searchParam
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                console.log("Vid ID ", response.result.items[0].id.videoId);
                let vidId = response.result.items[0].id.videoId
                createLink(vidId, searchParam, songListEl);
              },
              function(err) { console.error("Execute error", err); });
  }
 
 function createLink(vidId, searchParam, parent) {
    const li = document.createElement('li')
    const tag = document.createElement('a');
    const url = `https://www.youtube.com/watch?v=${vidId}`;
    const icon = document.createElement('img');
    tag.textContent = searchParam;
    tag.setAttribute('href', url);
    tag.setAttribute('target', '_blank');
    li.setAttribute('class', 'list-item');
    icon.setAttribute('src', './assets/images/youtube.png');
    icon.style.float = 'left';
    icon.style.height = '30px';
    icon.style.width = '30px';
    li.appendChild(tag);
    li.appendChild(icon);
    parent.appendChild(li);
    // Add url to local storage
    console.log('calling storeHistory');
    storeHistory (searchParam, url);
    // Add url to search list
    console.log ('calling createHistory');
    createHistory (searchParam,url);
 }

  userFormEl.addEventListener("click",execute)
  


