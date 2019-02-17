	const getDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

	document.querySelector('.calendar input').setAttribute('min', getDate);

	const awaiter = document.querySelector('.awaiter');
	
	document.querySelector('.calendar').addEventListener('change', () => {
		document.querySelector('input[name="hour"]').removeAttribute('value');
		document.querySelector('input[name="duration"]').removeAttribute('value');
		let reservedHours = [12];
		dataAwaitAnimationStart();
		setTimeout(function(){
			dataAwaitAnimationEnd();
			showSessions();	
			showHours(reservedHours);
			addSelection(reservedHours);
		}, 500)
	})

	

	const showHours = reservedHours => {
		let ul = document.querySelector('.date__hour');
		let list = '<h3>Wybierz godzinę:</h3><ul class="animated fadeInUp">';
		
		for (let i = 8; i <= 15; i++){
			let classes = '',
					title = '';
			if (reservedHours.includes(i)){
					classes += 'disabled';
					title    = 'Ta godzina jest zajęta';
			}
			list += '<li class="' + classes +'" title="'+ title +'">' + i + '<span></span></li>';
		}
			list += '</ul>';
			ul.innerHTML = list;						
	}

	const showSessions = () => { 
		let ul = document.querySelector('.date__session');
		let list = '<h3>Wybierz taryfę:</h3><ul class="session animated fadeInUp">';
		let sessionsArray = ['10zł / 1 Godzina', '20zł / 2 Godziny', '0zł / 2 Godziny'];
		for (let i = 0; i < sessionsArray.length; i++){
			list += '<li class="session__item">' + sessionsArray[i] + '<span></span></li>';
		}
			list += '</ul>';
			ul.innerHTML = list;					
	}


	const addSelection = trueHours => {
		let list = document.querySelectorAll('li[class=""]');
		let sessions = document.querySelectorAll('li[class*="session__item"]');

		for (li of list){
				li.addEventListener('click', function(){
					deleteSelection(li);	
					this.setAttribute('selected','1');	
					document.querySelector('input[name="hour"]').value = parseInt(this.innerHTML);
				});
		}
		for (session of sessions){
				session.addEventListener('click', function(){
					deleteSelection(session);
					resetHours(trueHours);
					this.setAttribute('selected','1');
					document.querySelector('input[name="duration"]').value = parseInt(this.innerHTML.split(' / ')[1][0]);
					
					currentSession = parseInt(this.innerHTML.split(' / ')[1][0]);
					if (currentSession === 2){	
						disableHoursForSessionLength();
					}
					
					selected = document.querySelectorAll('.date__hour li[selected="1"]');
					for (select of selected){
						select.removeAttribute('selected');	
					}
					
				});
		}	
	}

	const deleteSelection = type => {
		let selected;
		if (type.getAttribute('class') !== ""){
			selected = document.querySelectorAll('.date__session li[selected="1"]');	
		}
		else {
			selected = document.querySelectorAll('.date__hour li[selected="1"]');
		}
		for (select of selected){
				select.removeAttribute('selected');
		}
	}
	
	const resetHours = trueHours => {
		let hours = document.querySelectorAll('.date__hour li');
		hours = [...hours];
		for (let i = 8; i <= 15; i++){
			if (!trueHours.includes(i)){
				hours[i - 8].classList.remove('disabled');
			}
		}
	}

	const dataAwaitAnimationStart = () => {
		awaiter.style.display = "block";
		toAnimateDarkBackground(reservationForm, 1, 0.3, 10);
	}
	

	const dataAwaitAnimationEnd =() => {
		awaiter.style.display = "none";
		toAnimateLightBackground(reservationForm, 0.3, 1, 10);
	}

	const disableHoursForSessionLength = () => {
		let hours = document.querySelectorAll('.date__hour li');
		hours = [...hours];

		for (let i = 0; i < hours.length - 1; i++){
			if (hours[i + 1].getAttribute('class') === 'disabled'){
				hours[i].classList.add('disabled');
			}
		}
	}




