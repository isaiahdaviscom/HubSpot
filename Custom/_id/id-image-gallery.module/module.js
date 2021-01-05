((e)=>{
  console.clear();
	// 	GLOBALS
	const filter = document.querySelector(".filter");
  const columns = filter.querySelectorAll(".filter-list a");
	const list_type_dropdown = filter.querySelector(".list-type-dropdown");
	const filter_list_select = filter.querySelector(".filter-list-select");
	// 	SUPPORT
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState === 4) {
			bio.style.border = '1px solid #e8e8e8';
			if(request.status === 200) { 
				bio.innerHTML = request.responseText;
			} else {
				bio.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
			} 
		}
	}
	request.open('GET', 'Bio.txt');

  columns.forEach((el, i)=>{
    el.addEventListener('click', (e)=>{
			e.preventDefault();
			console.log(el.dataset);
			if (list_type_dropdown.classList.contains('open')){
				list_type_dropdown.classList.remove('open');
				// display
				filter.querySelector('.control').innerHTML = el.dataset.item;
				filter_list_select.innerHTML = el.dataset.item;
				filter.querySelector('input').value = el.dataset.item;
				//
				console.log(filter.querySelector('input'));
			}
		})
  });
	// send request 
	e.XMLHttpRequest('')
})(window);