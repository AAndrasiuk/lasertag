	const form 				 = document.querySelector('.userdata');
	const submitBtn 		 = document.querySelector('.userdata button');
	const hour 				 = document.querySelector('input[name="hour"]');
	const duration        = document.querySelector('input[name="duration"]');
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
	validationResult.isAllTrue = function(){
		let res = true;
		for (key in this){
			if(this[key] === false){		
				res = false;
				break;
			}
		}
		return res;
	}

	submitBtn.setAttribute('disabled','true');
	submitBtn.style.color = "rgba(255, 255, 255, .5)"
	

	for (input of validateIt){
		input.addEventListener('input', function(){
			if (this.getAttribute('name') === 'email'){
				colorChanger(this, emailRegExp.test(this.value));
			}else
			if (this.getAttribute('name') === 'name' || this.getAttribute('name') === 'surname'){
				colorChanger(this, nameRegExp.test(this.value))
			}else
			if (this.getAttribute('name') === 'phoneNumber'){
				colorChanger(this, phoneNumberRegExp.test(this.value))
			}else
			if (this.getAttribute('name') === 'toReserveDate1'){
				colorChanger(this, dateRegExp.test(this.value))
			}}
	)}

	
	let hourObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function() {
			if (hour.getAttribute('value')){
				validationResult[hour.getAttribute('name')] = true;
				allowSubmit();
			}else{
				validationResult[hour.getAttribute('name')] = false
				allowSubmit();	
			}
		});
	});
	hourObserver.observe(hour, {attributes:true});
	
	let durationObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function() {
			if (duration.getAttribute('value')){
				validationResult[duration.getAttribute('name')] = true;
				allowSubmit();
			}else{
				validationResult[duration.getAttribute('name')] = false
				allowSubmit();	
			}
		});
	});
	durationObserver.observe(duration, {attributes:true});
	

	const colorChanger = (obj, res) => {
		if (res){
			obj.style.color = "rgba(255, 255, 255, 1)";
			validationResult[obj.getAttribute('name')] = true;
			allowSubmit();
		}else{
			obj.style.color = "rgba(255, 255, 255, .5)";
			validationResult[obj.getAttribute('name')] = false;
			allowSubmit();
		}
	}
	
	const allowSubmit = () => {
		!validationResult.isAllTrue() 
			? submitBtn.setAttribute('disabled','true')
			: submitBtn.removeAttribute('disabled') 
				? submitBtn.style.color = "rgba(255, 255, 255, .5)"
				: submitBtn.style.color = "rgba(255, 255, 255, 1)"
	}