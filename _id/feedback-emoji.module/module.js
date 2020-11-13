var forms = document.querySelectorAll('form');
forms.forEach(function (el, i){
var checkboxes = el.querySelectorAll("input[type='checkbox']");
  console.log(checkboxes)
})