let form_container = document.getElementById('form_container');
let form = form_container.querySelector('form');
console.log(`This is the form %s`, form);
  $('document').ready(function(){
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById("hs_form_target_widget_1593020416973");
  let trigger_set = false;
  let loop = 0;
  let calcWidth = "calc(50% - 4%)";
  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };
  // Callback function to execute when mutations are observed
    function blah(elem){
      for (i = 0; i < elem.length; i++){
        i === 0 ? elem[i].style.width = "100%" : elem[i].style.width = calcWidth;
      }
    }
	function layout(elem){
      let A_first = elem.firstChild;
      let A_first_children = A_first.children;
      A_first.style.display = "flex";
      A_first.style.flexWrap = "wrap";
      blah(A_first_children);
    }
  const callback = function(mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      let elem = mutationsList[0].target;
      if (elem.dataset.reactid === ".hbspt-forms-0"){
        if (trigger_set === false){
          let A = document.querySelector("[data-reactid='.hbspt-forms-0.1:$14']");
          let B = document.querySelector("[data-reactid='.hbspt-forms-0.1:$16']");
          let tempA = document.querySelector("[name='company_senior_business_hours_boolean']");
          // flex wrap
          layout(A);
          layout(B);
          // 
          trigger_set = true;
          B.style.display = "none";
          if (tempA.checked == true){ 
              B.style.display = "block";
              B.querySelector("input").checked == true;
          }
          //
          tempA.addEventListener('change', function(e){
            blah(A.firstChild.children);
            blah(B.firstChild.children);
            if(this.checked) {
              B.style.display = "block";
              B.querySelector("input").checked == true;
            } else {
              B.style.display = "none";
              B.querySelector("input").checked == false;
            }
          })
          //
          A.addEventListener('change', function(e){
            blah(A.firstChild.children);
            blah(B.firstChild.children);
          })
          //
          B.addEventListener('change', function(e){
            blah(A.firstChild.children);
            blah(B.firstChild.children);
          })
          elem.addEventListener('change', function(e){ e.preventDefault();})
          obs.disconnect()
        }
      }
  };
  // Create an observer instance linked to the callback function
  const obs = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  obs.observe(targetNode, config);
});