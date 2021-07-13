//var APIKey = "dcb181604732ed5c2eafc5ab0d4d96b6";

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


searchBtn.on('click', function() {
    
    if (!accessToken) {
         Authorization();
     } else {
        searchVimeo(searchInputValue);

     }
});
  
function searchVimeo() {

}