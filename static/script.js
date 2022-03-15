const btn = document.querySelector('#btn');
let form = document.querySelector('#signupform');

form.addEventListener('submit', check);

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


let editOpenButton = document.querySelector(".profile-body main button");
let editSluitenButton = document.querySelector(".profile-body form button:last-of-type");
let editform = document.querySelector(".profile-body form");

editOpenButton.addEventListener("click", toggleMenu);
editSluitenButton.addEventListener("click", toggleMenu);

function toggleMenu(event) {
  editform.addclassList.toggle("editOpen");
  event.target.blur(); /* button verliest focus na de klik */
}