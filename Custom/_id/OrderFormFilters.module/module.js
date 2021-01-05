((e)=>{
  e.onload = ()=>{
    const depts = document.querySelectorAll("[data-store-category]");
    const hsFormProps = ['department_filter'];
    const hsDepts = document.querySelectorAll("ul[data-reactid='.hbspt-forms-0.1:$0.$department_filter.0']");

    console.log(depts);
    console.log(hsDepts);
  }
})(window)