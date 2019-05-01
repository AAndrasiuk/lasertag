const bodyWithoutReservation = document.querySelectorAll('header, footer, section:not(.reservation)');
const reservationForm        = document.querySelectorAll('.reservation div:not(.awaiter)');
const reservationBtns        = document.querySelectorAll('.action-btn');
const formSubmit             = document.querySelector('.userdata');
const closeBtn               = document.querySelector(".reservation .close");
const duration 				  = document.querySelector('input[name="duration"]');
const hour 				 		  = document.querySelector('input[name="hour"]');

const removeSelection = () => {
	let toRemoveSelection = document.querySelectorAll('.reservation [selected="1"]');
	toRemoveSelection.forEach(selection => selection.removeAttribute('selected'));
}

const animateBackground = (elements, from = 0, to = 1, interval = 40) => {
   let opacity = from;
   const value = 0.1;
   const toDarken = from > to;

   const timeOut = setInterval(() => {
		toDarken
			? opacity <= to && clearInterval(timeOut)
			: opacity >= to && clearInterval(timeOut);

	opacity += toDarken ? -value : value;
	elements.forEach(el => el.style.opacity = opacity);
		
   }, interval);
};

const resetForm = () => {
	document.querySelectorAll('.userdata input').forEach(input => input.value = "");

	let selected = document.querySelectorAll('li[selected="1"]');
	selected = [...selected].forEach(sel => sel.removeAttribute('selected'));
	hour.removeAttribute("value");
	duration.removeAttribute("value");
}

const swiper = new Swiper('.swiper-container', {
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

animateBackground(reservationForm, 1, 0);

for (link of reservationBtns){
	link.addEventListener('click', e => {
		e.preventDefault();
		document.querySelector('.reservation').classList.remove('none');
		animateBackground(bodyWithoutReservation, 1, 0);
		animateBackground(reservationForm, 0, 1);
	})
}

closeBtn.addEventListener("click", () => {
   animateBackground(reservationForm, 1, 0);
   setTimeout(() => {
      document.querySelector(".reservation").classList.add("none");
      resetForm();
   }, 400);
	removeSelection();
   animateBackground(bodyWithoutReservation, 0, 1);
});

formSubmit.addEventListener('submit', e => {
	e.preventDefault();
	swal("Zapisałeś się!", "Niedługo z Tobą skontaktujemy się", "success")
	resetForm();
})	