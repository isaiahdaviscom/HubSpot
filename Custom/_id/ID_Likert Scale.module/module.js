window.onload = () => {
  console.clear();
  class TwoChainz {
    /***
     * @class TwoChainz
     * @author Isaiah
     * @description What it do boo? A class to create a two way binding system
     */
    constructor(elem, options) {
      this.elem = elem;
      this.options = options;
    }
    initEvents() { 
      let obj = this.obj;
      for (var k = 0; k < obj[0].length; k++) {
        obj[0][k].addEventListener('click', this.onClick.bind(this, k));
      }
    }
    onClick(ev, k) {
      this.obj[1][ev].checked = true;
    }
    bind() {
      this.obj = arguments;
      this.initEvents();
      return {
        click: this.onClick
      }
    }
  }
  // GLOBAL
  const form = document.querySelector("[data-reactid='.hbspt-forms-0']");
  console.log(form);
  const form_likert = document.querySelectorAll(".hs_likert_scale input[type='radio']");
  const likert = document.querySelectorAll('#likert li');
  const result = document.getElementById('result');
  // LOCAL
  const likert_scales = new TwoChainz(result);
  // a / b
  likert_scales.bind(likert,form_likert).click((el) => {
    //
  });
}