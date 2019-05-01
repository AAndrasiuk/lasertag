const form 				 = document.querySelector('.userdata');
const submitBtn 		 = document.querySelector('.userdata button');
const validateIt 		 = document.querySelectorAll(`input[name="name"], 
																	input[name="surname"], 
																	input[name="email"], 
																	input[name="phoneNumber"],
																	input[name="toReserveDate1"],
																	input[name="hour"]`
																	);

const nameRegExp 		   = /^[a-zA-z]{3,12}$/;
const emailRegExp       = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const phoneNumberRegExp = /^(?:\(?\+?48)?(?:[-\.\(\)\s]*(\d)){9}\)?$/;	
const dateRegExp 		   = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
const validationResult  = {
	name 				: false,
	surname 			: false,
	phoneNumber 	: false,
	email 			: false,
	toReserveDate1 : false,
	hour				: false,
	duration       : false
};

validationResult.isAllTrue = function() {
	let res = true;
	
   for (key in this) {
      if (this[key] === false) {
         res = false;
         break;
      }
   }
   return res;
};
  
const validateField = (field, value) => {
	if (field === "email") { return emailRegExp.test(value); }

	if (field === "name" || field === "surname") { return nameRegExp.test(value); }
	
	if (field === "phoneNumber") { return phoneNumberRegExp.test(value); }
	
   if (field === "toReserveDate1") { return dateRegExp.test(value); }
};

const setFieldValidationResult = field => {
	validationResult[field.getAttribute('name')] = field.getAttribute('value') ? true : false;
	allowSubmit();
} 

const hourObserver = new MutationObserver(mutations => {
	mutations.forEach(() => setFieldValidationResult(hour));
});

const durationObserver = new MutationObserver(mutations => {
	mutations.forEach(() => setFieldValidationResult(duration));
});

const changeColor = (obj, res) => {
	obj.style.color = res ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, .5)" 
	validationResult[obj.getAttribute('name')] = res ? true : false;
}

const allowSubmit = () => {
	if (validationResult.isAllTrue()) {
		submitBtn.removeAttribute('disabled');
		submitBtn.style.color = "rgba(255, 255, 255, 1)";
	} else {
		submitBtn.setAttribute('disabled', 'true')
		submitBtn.style.color = "rgba(255, 255, 255, .5)"
	}
}

submitBtn.setAttribute('disabled', 'true');
submitBtn.style.color = "rgba(255, 255, 255, .5)"
	
for (input of validateIt) {
	input.addEventListener('input', function () {
		const validationResult = validateField(this.getAttribute('name'), this.value);
		changeColor(this, validationResult);
		allowSubmit();
	})
}

hourObserver.observe(hour, { attributes: true });

durationObserver.observe(duration, { attributes: true });