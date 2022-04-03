// Preventing user from submitting form when not agreed to terms & conditons
const btn = document.querySelector('#btn');
const form = document.querySelector('#signupform');

// form.addEventListener('submit', check);

function check (event) {
	event.preventDefault()
	let terms = document.querySelector('#terms').checked;
	console.log(terms)
	
	if (terms == false){
		btn.classList.add("checked")
	}
	else{
		form.submit()
	}
	
}

// Opening and closing edit form on profilepage
const editOpenButton = document.querySelector(".profile-body main button");
const editSluitenButton = document.querySelector(".profile-body form button:last-of-type");
const editform = document.querySelector(".editform");

// editOpenButton.addEventListener("click", toggleMenu);
// editSluitenButton.addEventListener("click", toggleMenu);

function toggleMenu() {
//   editform.classList.toggle("editOpen");
editform.classList.toggle("editOpen");

//   event.target.blur(); /* button verliest focus na de klik */
}


