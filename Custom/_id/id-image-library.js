(()=>{
	let url_search_params = new URLSearchParams(window.location.search);
	console.log(url_search_params);
})();
		
/*	
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('image_type') == "Branding" && urlParams.has('primary_category')) {
        //Loop through products and generate sub categories for brand images
        var subCatOptions = {};
        var subCatDD = $('#sub_category');
        $('.product-information').each(function () {
            var mydata = $(this).data('subcategory');
            for (i = 0; i < mydata.length; i++) {
                //If this branding image isn't the current selected one.... hide it
                if (urlParams.has('sub_category') && urlParams.get('sub_category') != "" && urlParams.get('sub_category') != mydata[i].id) {
                    console.log('hidding');
                    $(this).parent().hide();
                } else {
                    $(this).parent().show();
                }

                //If we haven't already added this item to the list, add it
                if (!(mydata[i].id in subCatOptions)) {
                    subCatOptions[mydata[i].id] = mydata[i].name;
                }
            }
        });
        //Now that we have a unique list of options, populate drop down
        $.each(subCatOptions, function (key, value) {
            //If currently selected in Query String, select in DD
            if (urlParams.get('sub_category') == key) {
                $('#sub_category')
                    .append($("<option></option>")
                        .attr("value", key)
                        .attr("selected", "selected")
                        .text(value));
            } else {
                $('#sub_category')
                    .append($("<option></option>")
                        .attr("value", key)
                        .text(value));
            }
        });
    }
});

//If the primary changes, reset the sub category
$('#primary_category').change(function () {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('sub_category');
    urlParams.delete('primary_category');
    urlParams.append('primary_category', $(this).val());
    urlParams.delete('q');
    urlParams.delete('search_type');
    var newUrl = location.pathname + '?' + urlParams.toString();
    $(location).attr('href', newUrl);
});

$('#image_type').change(function () {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('sub_category');
    urlParams.delete('primary_category');
    urlParams.delete('image_type');
    urlParams.delete('q');
    urlParams.delete('search_type');
    urlParams.append('image_type', $(this).val());
    var newUrl = location.pathname + '?' + urlParams.toString();
    $(location).attr('href', newUrl);
});

$('#text-search-btn').click(function (event) {
    event.preventDefault();
    var searchVar = document.getElementById("text-search");

    if (searchVar.validity.valueMissing) {
        searchVar.setCustomValidity("This is a required field. Please enter your search criteria.");
        searchVar.reportValidity();
        return;
    }
    var urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('sub_category');
    urlParams.delete('primary_category');
    urlParams.delete('image_type');
    urlParams.append('image_type', 'Product');
    urlParams.delete('q');
    urlParams.append('q', $('#text-search').val());
    urlParams.delete('search_type');
    urlParams.append('search_type', $("input:radio[name='search_type']:checked").val());

    var newUrl = location.pathname + '?' + urlParams.toString();
    $(location).attr('href', newUrl);
});
*/