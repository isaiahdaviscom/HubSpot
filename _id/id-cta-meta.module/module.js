console.clear();
let mutationObserver = new MutationObserver(function(mutations) {
	let element = mutations[1].target;
	let cta_text = document.querySelector('.cta_text');
	cta_text.innerHTML = element.innerText;
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});
mutationObserver.observe(document.querySelector('.cta_preview'),{
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
})