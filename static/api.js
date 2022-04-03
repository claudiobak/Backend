// //////////////////
// //// API  ///////
// /////////////////

// Hier halen we de spreadsheet op
const CONFIG = {
	spreadsheetId: '1q7OH3nXXC9zpWChWU3uzynQ28DHxPJcZdUgdfOXxVl8',
	spreadsheetName: 'Blad1'
}

// Die haalt de API link op
async function getData() {
	let res = await fetch(`https://opensheet.elk.sh/${CONFIG.spreadsheetId}/${CONFIG.spreadsheetName}`)
	return await res.json();
}

// Hier halen we de gegevens op en hiermee kunnen we ook stijlen
function gegevensOphalen(data) {
	let apiTips  = document.querySelector('#api-section');
    console.log('apiTips')
	
	console.log(data);

	data.forEach(item => {
		let container = document.createElement('article');
		
		let tip = document.createElement('h5');
		tip.textContent = item['tip'];
		
		let uitlegTip = document.createElement('p');
		uitlegTip.textContent = item['uitlegTip'];
		
		container.appendChild(tip);
		container.appendChild(uitlegTip);
		apiTips.appendChild(container);
	})

}

if(document.querySelector('#api-section')) {
	getData()
	.then(data => {	
        gegevensOphalen(data);
	})
}