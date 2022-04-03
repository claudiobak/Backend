// Adding a class to a form so it slides in when user clicks on the edit button
const openButton = document.querySelector('#open-btn');
const closeButton = document.querySelector('#close-btn');
const editForm = document.querySelector('#editform');

// adding the classlist
openButton.addEventListener('click', (event) => {
	editForm.classList.add('.editOpen')
} );
					
// removing the classlist
closeButton.addEventListener('click', (event) => {
	editForm.classList.remove('.editOpen')
});