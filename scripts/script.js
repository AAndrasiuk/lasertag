const bodyWithoutReservation = document.querySelectorAll('header, footer, section:not(.reservation)');
const reservationForm        = document.querySelectorAll('.reservation div:not(.awaiter)');
const reservationBtns        = document.querySelectorAll('.action-btn');
const formSubmit             = document.querySelector('.userdata');

reservationForm.forEach(el => el.style.opacity = 0);

for (link of reservationBtns){
	link.addEventListener('click', function(e){
		e.preventDefault();
		toAnimateDarkBackground(bodyWithoutReservation);
		toAnimateLightBackground(reservationForm);
		document.querySelector('.reservation').classList.remove('none');
	})
}

let closeBtn = document.querySelector('.reservation .close');
		closeBtn.addEventListener('click', function(){
			toAnimateDarkBackground(reservationForm);	
			setTimeout(function(){
				document.querySelector('.reservation').classList.add('none');
				resetForm();
			}, 400);
			removeSelection();
			toAnimateLightBackground(bodyWithoutReservation);	
});

const removeSelection = () => {
	let toSelectionRemove = document.querySelectorAll('.reservation [selected="1"]');
	for (selection of toSelectionRemove){
		selection.removeAttribute('selected');
	}
}

formSubmit.addEventListener('submit', function(e){
	e.preventDefault();
	swal("Zapisałeś się!", "Niedługo z Tobą skontaktujemy się", "success")
	resetForm();
})	

const toAnimateDarkBackground = (elements, from = 1, to = 0, interval = 40) => {
		let opacity = from;
		let timeOut = setInterval(function(){
			if (opacity <= to){
				clearInterval(timeOut);
			}else {	
				opacity -= 0.1;
				elements.forEach(el => el.style.opacity = opacity)		
			}
		}, interval);
}

const toAnimateLightBackground = (elements, from = 0, to = 1, interval = 40) => {
		let opacity = from;
		let timeOut = setInterval(function(){
			if (opacity >= to){
				clearInterval(timeOut);
			}else {
				opacity += 0.1;
				elements.forEach(el => el.style.opacity = opacity)
			}
		}, interval);
}



const resetForm = () => {
	document.querySelector('.userdata input[name="name"]').value = "";
	document.querySelector('.userdata input[name="surname"]').value = "";
	document.querySelector('.userdata input[name="email"]').value = "";
	document.querySelector('.userdata input[name="phoneNumber"]').value = "";
	let selected = document.querySelectorAll('li[selected="1"]');
	selected = [...selected];
	selected = selected.forEach(sel => sel.removeAttribute('selected'));
}


let swiper = new Swiper('.swiper-container', {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
		clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
});



	
