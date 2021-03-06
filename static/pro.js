// Progressive Enhancement 
const loginForm = document.querySelector("#loginform");
// Als er gesubmit word checkt hij dus de volgende dingen
loginForm.addEventListener("submit", (event) => {
	event.preventDefault();
	// hij leest de inputs tevoorschijn
	const inputs = event.target.querySelectorAll("input");
	const errorLabel = event.target.querySelector("label#error");
	// als de inputs geen value hebben maakt hij een class aan genaamd errorLabel en zet hij hier tekst in.
	if (!inputs[0].value || !inputs[1].value) {
        errorLabel.classList.add("errorLabel");
		errorLabel.innerHTML = "<span>Error:</span> Please fill in all fields!";
		inputs.forEach(element => {
			element.classList.add("fouteInput");
		});
	// En anders submit hij hem
	} else {
		event.target.submit();
	}
});