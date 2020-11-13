document.addEventListener('DOMContentLoaded', function(){// create a unique class to inject in options
let options = {
  valueNames: [ 'image','published' ],
  page: 6,
  pagination: {
    innerWindow: 1,
    left: 0,
    right: 0,
    paginationClass: "pagination",
    }
};
const tableList = new List('tableID', options);
tableList.sort('published', { order: "desc" }); // create a dynamic solution to adding presort order 
// EventHandler
$('.jPaginateNext').on('click', function(){
    var list = $('.pagination').find('li');
    $.each(list, function(position, element){
        if($(element).is('.active')){
            $(list[position+1]).trigger('click');
        }
    })
});
$('.jPaginateBack').on('click', function(){
    var list = $('.pagination').find('li');
    $.each(list, function(position, element){
        if($(element).is('.active')){
            $(list[position-1]).trigger('click');
        }
    })
});
})