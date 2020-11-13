let cal_btns = document.querySelectorAll('.cal');
	cal_btns.forEach((el, i)=>{
		let elemData = el.dataset;
		let temp_ics = new ics;
		temp_ics.addEvent(elemData.subject,elemData.description,elemData.location,elemData.startDate,elemData.endDate)
		el.addEventListener('click', (e)=>{
			e.preventDefault();
			temp_ics.download(elemData.name)
			console.log('hello')
		})
		
	})