const historyContainer = document.getElementById('history');

var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});

//Function to retrieve searches array from local storage
// returns the searches array or an empty array if nothing in local storage
function getSearches() {
  return JSON.parse(localStorage.getItem("searches")) || [];
}

// Function to load searches array into history
function loadHistory () {
  let searches = getSearches();
  if (searches) {
    for (let i = 0; i < searches.length; i++) {
      createHistory(searches[i]);
    }
  }
}

// Function to create an item in the history dropdown list. It is passed a url.
function createHistory (searchParam,url) {
  const tag = document.createElement('a');
  console.log('got here 1');
  tag.textContent = searchParam;
  tag.setAttribute('href', 'url');
  tag.setAttribute('target', '_blank');
  tag.setAttribute('class', 'dropdown-item');
  historyContainer.appendChild(tag);
}

//Function to add a searched item to the beginning of the array in local storage
// and limit size of history to 10 items.
function storeHistory (url) {
  let searches = [];
  // retrieves searches array from local storage
  searches = getSearches();
  //adds url to the beginning ofthe searches array
  searches.unshift(url);
  // while the searches array is greater then 10 one item will been removed from the end of the array.
  while (searches.length > 10) {
    searches.pop();
  }
  //store the searches array in local storage 
  localStorage.setItem("searches", JSON.stringify(searches));
}
createHistory ('fred');
console.log('got here 2');