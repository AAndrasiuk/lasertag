jQuery(document).ready(function($) {
	document.querySelector('.calendar input').setAttribute('min', getDate());
	let awaiter = document.querySelector('.awaiter');
	$('.calendar').change(function(){
		document.querySelector('input[name="hour"]').removeAttribute('value');
		document.querySelector('input[name="duration"]').removeAttribute('value');
		let reservedHours = `8.9.10.11.12.13.14.15`.split('.').map(el => +el);
		dataAwaitAnimationStart();
		setTimeout(function(){
			dataAwaitAnimationEnd();
			showSessions();	
			showHours();
			addSelection(reservedHours);
		}, 500)
	});

	function getDate(){
		return todayUTC = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
	}

	function showHours(){
		let ul = document.querySelector('.date__hour');
		let list = '<h3>Wybierz godzinę:</h3><ul class="animated fadeInUp">';
		
		for (let i = 8; i <= 15; i++){
			list += '<li class="" title="">' + i + '<span></span></li>';
		}
			list += '</ul>';
			ul.innerHTML = list;			
	}

	function showSessions(){
		let ul = document.querySelector('.date__session');
		let list = '<h3>Wybierz taryfę:</h3><ul class="session animated fadeInUp">';
		let sessionsArray = ['10zł / 1 Godzina', '20zł / 2 Godziny', '0zł / 2 Godziny'];
		for (let i = 0; i < sessionsArray.length; i++){
			list += '<li class="session__item">' + sessionsArray[i] + '<span></span></li>';
		}
			list += '</ul>';
			ul.innerHTML = list;					
	}


	function addSelection(trueHours){
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

	function deleteSelection(type){
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
	
	function resetHours(trueHours){
		let hours = document.querySelectorAll('.date__hour li');
		hours = [...hours];
		for (let i = 8; i <= 15; i++){
			if (!trueHours.includes(i)){
				hours[i - 8].classList.remove('disabled');
			}
		}
	}

	function dataAwaitAnimationStart(){
		awaiter.style.display = "block";
		toAnimateDarkBackground(reservationForm, 1, 0.3, 10);
	}
	

	function dataAwaitAnimationEnd(){
		awaiter.style.display = "none";
		toAnimateLightBackground(reservationForm, 0.3, 1, 10);
	}

	function disableHoursForSessionLength(){
		let hours = document.querySelectorAll('.date__hour li');
		hours = [...hours];

		for (let i = 0; i < hours.length - 1; i++){
			if (hours[i + 1].getAttribute('class') === 'disabled'){
				hours[i].classList.add('disabled');
			}
		}
	}
});




