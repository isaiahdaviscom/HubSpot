//  Global Variables
const URL = '/_hcms/search?&term=';

// // Support Functions
const debounce = (func, wait) => {
  let timeout;
  console.log(func);
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const ajax = (method, url, callback, bool) => {
  let http = new XMLHttpRequest();
  http.open('GET', url, true);
  http.onload = () => {
    if (http.status >= 200 && http.status < 400) {
      let data = JSON.parse(http.responseText);
      callback(data);
    } else {
      console.error('Server reached, error retrieving results.');
    }
  };
  http.onerror = () => {
    console.error('Could not reach the server.');
  };
  http.send();
}


// OLD START
// https://www.iga.com/_hcms/raw-resource?path=_id/myHub/js/search-input.js&portalId=3870075&t=1594873310798
// https://cdn2.hubspot.net/hub/3870075/hub_generated/template_assets/32365950335/1594873388540/_id/myHub/js/search-input.min.js
function hsSearch(_instance) {
	// Globals
  let TYPEAHEAD_LIMIT = 10;
  let searchTerm = '';
  let searchForm = _instance;
  let searchField = _instance.querySelector('.hs-search-field__input');
  let searchResults = _instance.querySelector('.hs-search-field__suggestions');
	// Initialization
	function init() {
		eventHandler();
  }
	// EventHandlers
	function eventHandler(){
		searchField.addEventListener('input', (e)=>{
			if (
				e.which != 9 &&
				e.which != 40 &&
				e.which != 38 &&
				e.which != 27 &&
				searchTerm != searchField.value
			) {
				debounce(function (){
					console.log(`searchTerm: %s`, this);
					searchTerm = searchField.value.toLowerCase();
					if (searchTerm.length > 2) {
						getSearchResults();
					} else if (searchTerm.length == 0) {
						emptySearchResults();
					}
				}, 250)();
			}
		});
	}

  function searchOptions() {
    let formParams = [];
    let form = _instance.querySelector('form');
    for ( let i = 0; i < form.querySelectorAll('input[type=hidden]').length; i++) {
      let e = form.querySelectorAll('input[type=hidden]')[i];
      if (e.name !== 'limit') {
        formParams.push( encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value));
      }
    }
    let queryString = formParams.join('&');
    return queryString;
  };

  let emptySearchResults = function () {
    searchResults.innerHTML = '';
    searchField.focus();
    searchForm.classList.remove('hs-search-field--open');
  }

  function fillSearchResults(response) {
    let items = [];
    response.results.forEach(function (val, index) {
      items.push("<a  class='dropdown-item' href='" + val.url + "'>" + val.title + "</a>");
    });

    emptySearchResults();
    searchResults.innerHTML = items.join('');
    searchForm.classList.add('hs-search-field--open');
  }

  function getSearchResults() {
		console.log(`getSearchResults triggered`)
    let request = new XMLHttpRequest();
    let requestUrl =
      '/_hcms/search?&term=' +
      encodeURIComponent(searchTerm) +
      '&limit=' +
      encodeURIComponent(TYPEAHEAD_LIMIT) +
      '&autocomplete=true&analytics=true&' +
      searchOptions();
    ajax('GET', requestUrl, (data)=>{
			console.log(data);
			if (data.total > 0) {
          fillSearchResults(data);
          trapFocus();
        } else {
          emptySearchResults();
        }
		}, true )
  }

  function trapFocus() {
    let tabbable = [];
    tabbable.push(searchField);
    let tabbables = searchResults.getElementsByTagName('A');
    for (let i = 0; i < tabbables.length; i++) {
      tabbable.push(tabbables[i]);
    }
    let firstTabbable = tabbable[0],
      lastTabbable = tabbable[tabbable.length - 1];
    let tabResult = function (e) {
        if (e.target == lastTabbable && !e.shiftKey) {
          e.preventDefault();
          firstTabbable.focus();
        } else if (e.target == firstTabbable && e.shiftKey) {
          e.preventDefault();
          lastTabbable.focus();
        }
      },
      nextResult = function (e) {
        e.preventDefault();
        if (e.target == lastTabbable) {
          firstTabbable.focus();
        } else {
          tabbable.forEach(function (el) {
            if (el == e.target) {
              tabbable[tabbable.indexOf(el) + 1].focus();
            }
          });
        }
      },
      lastResult = function (e) {
        e.preventDefault();
        if (e.target == firstTabbable) {
          lastTabbable.focus();
        } else {
          tabbable.forEach(function (el) {
            if (el == e.target) {
              tabbable[tabbable.indexOf(el) - 1].focus();
            }
          });
        }
      };
    searchForm.addEventListener('keydown', function (e) {
      switch (e.which) {
        case 9:
          tabResult(e);
          break;
        case 27:
          emptySearchResults();
          break;
        case 38:
          lastResult(e);
          break;
        case 40:
          nextResult(e);
          break;
      }
    });
  }

  
  init();
};

if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
  let searchResults = document.querySelectorAll('.hs-search-field');
  Array.prototype.forEach.call(searchResults, function (el) {
    let hsSearchModule = new hsSearch(el);
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
    let searchResults = document.querySelectorAll('.hs-search-field');
    Array.prototype.forEach.call(searchResults, function (el) {
			console.log(el)
      let hsSearchModule = new hsSearch(el);
    });
  });
}