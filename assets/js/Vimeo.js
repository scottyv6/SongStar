const clientIdentifier = "50894b44081b3e60c7f38f3ee38c9509b0f40411";
const clientSecret = "4OgG4BCdLIQMM//ZE3bpkbAvQuxnakkCHK09wVrgJF8+Cnj7TZVr3TaKwUPdHZMJLLbRV/pR1f1ymkE4JkHF93B6RlHRDoBlenos0lJkmbqXL4hQRjdrLJUk5wp69HE5"

const token = 'dcb181604732ed5c2eafc5ab0d4d96b6';
var enc = window.btoa(clientIdentifier+':'+clientSecret);
console.log(enc);
var basic = 'basic '+enc;
console.log(basic);

var accessToken;

var searchBtn = $('#search-btn');
var searchInputValue = $('#search-input');
var songListUl = $('#song-list');

var searches = [];



function AuthorizationVimeo() {

fetch('https://api.vimeo.com/oauth/authorize/client', {
method: 'post',  
headers: {
    'Authorization': basic,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.vimeo.*+json;version=3.4'
  },
  body:JSON.stringify( {
    "grant_type": "client_credentials",
    "scope": "public"
  })
})
  .then(res => res.json())
  .then(data =>{
    accessToken = data.access_token;
    console.log(accessToken);
   console.log(data)});
};

$(document).ready(function() {
    AuthorizationVimeo();
})


searchBtn.on('click', function(event) {
    event.preventDefault();
    var vimeoSearchInput = searchInputValue.val().trim();

    if (!accessToken) {
         Authorization();
     } else {
        searchVimeo(vimeoSearchInput);

     }
});
  
function searchVimeo(searchInputValue) {

    var vimeoQueryURL = "https://api.vimeo.com/videos?query=" + searchInputValue + "&per_page=1";

    fetch(vimeoQueryURL,{
      method: 'get',
      headers: {
          'Authorization': 'Bearer '+accessToken,
      }
    })
        .then(function (response){
            return response.json();
    })
        .then(function (vimeoData){
            console.log(vimeoData);

              var songListEl = $('<li>');
              var songLink = $('<a>');
              var vimeoIcon = $('<img>');

              songLink.text(vimeoData.data[0].name);
              console.log(vimeoData.data[0].name);
              vimeoIcon.attr("src", "./assets/images/vimeo_website_icon.png");
              vimeoIcon.css({"float": "left", "height": "30px", "width": "30px"});
              songLink.attr("target", "_blank" );
              songListEl.addClass("list-item");

              const url = vimeoData.data[0].link;
              var searchParam = vimeoData.data[0].name;
              
              songLink.attr("href", vimeoData.data[0].link);
              songListEl.append(songLink);
              songListEl.append(vimeoIcon);
              songListUl.append(songListEl);

              storeHistory (searchParam, url);
              
              createHistory (searchParam, url);
    })

};