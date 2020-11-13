(function(){
  // Support
  function setSearchBarDefault(searchedTerm) {
    var searchBars = document.querySelectorAll('.hs-search-field__input');
    Array.prototype.forEach.call(searchBars, function (el) {
      el.value = searchedTerm;
    });
  }
  
  function httpRequest(term, offset) {
    const path = "/_hcms/search?";
    let requestUrl = path + searchParams + "&analytics=true";
    let request = new XMLHttpRequest();
    //
    request.open('GET', requestUrl, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        setSearchBarDefault(data.searchTerm);
        if (data.total > 0) {
          fillResults(data);
          paginate(data);
        } else {
          emptyResults(data.searchTerm);
          emptyPagination();
        }
      } else {
        console.error('Server reached, error retrieving results.');
      }
    };
    request.onerror = function () {
      console.error('Could not reach the server.');
    };
    request.send();
    }
  //   
  function hsResults(elem){
    let template = elem.querySelector('.hs-search-result-template');
    let section = elem.querySelector('.hs-search-result-listings');
    let path = elem.querySelector('.hs-search-result-pagination').getAttribute('data-search-path');
    let prev = elem.querySelector('.hs-search-result-prev-page');
    let next = elem.querySelector('.hs-search-result-next-page');
  }
})(window);