// tabs
var navModule = document.querySelector("#tabbed_navigation");
var tabLinks = navModule.querySelectorAll(".tab_nav_item a");
var tabContent = document.querySelectorAll(".tabcontent");
//
tabLinks.forEach(function(el) {
   el.addEventListener("click", (event)=>{
     event.preventDefault();
     openTabs(event);
   });
});
//
function openTabs(e) {
   var btnTarget = e.target;
   var tabPage = btnTarget.dataset.page;
    var query = "#" + tabPage;
   tabContent.forEach(function(e) {
      e.classList.remove("active");
   });
   tabLinks.forEach(function(e) {
      e.classList.remove("active");
   });
  ////console.log(document.querySelector(query));
  console.log(query);
   document.querySelector(query).classList.add("active");
   btnTarget.classList.add("active");
}
document.getElementById('logos').classList.add("active");