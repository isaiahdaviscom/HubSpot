let searchBar = document.getElementById("searchBar");

function filterList() {
		// Variables
		var input, filter, searchable, li, columns;
		input = document.getElementById('searchBar');
		filter = input.value.toUpperCase();
		searchable = document.getElementById('searchableSection');
		li = searchable.getElementsByTagName('li');
		columns = searchable.getElementsByClassName('col-md-4');
		// Check if filter matches anything in the searchable area
		findAMatch(li, filter);
		// Check column items are visible, if not hide the columns
		checkColumns(columns);
	}
	// Check columns to see if children are visible, if not then hide columns
	function checkColumns(columns) {
		var i;
		for(i = 0; i < columns.length; i++) {
			//check childern li of columns
			if(checkColumnChildren(columns[i])){
				 columns[i].style.display = 'none';
			} else {
				columns[i].style.display = 'block';
			}
		}
	}


	// Check if li elements from single column are all hidden
	function checkColumnChildren(singleColumn) {
		var i, columnItems, counter;
		counter = 0;
		columnItems = singleColumn.getElementsByTagName('li');
		for(i = 0; i < columnItems.length; i++) {
			if (columnItems[i].style.display == 'none') {
					counter++;
			}
		}
		if (counter == columnItems.length) {
			return true;
		} else {
			return false;
		}
	}
	// Checks if li innerText matches filter
	function findAMatch(li, filter) {
		var a, i;
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("a")[0];
			if (a.innerText.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			 } else {
				li[i].style.display = "none";
			 }
		}
	}

searchBar.addEventListener('keyup', filterList)