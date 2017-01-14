// CODE TO FETCH BULLETINS

var bulletinBoardEl = document.querySelector('#bulletin-board')

var handleResponse = function(bulletinsArray) {
	console.log(bulletinsArray)

	var html = '<h2>bulletins loaded!</h2>'
	// FOR every bulletin, we will write an HTML element and insert the content.

	for (var position = 0; position < bulletinsArray.length; position += 1) {
		var bulletin = bulletinsArray[position]
		html += '<div class="bulletin">'
		html +=		'<h3>' + bulletin.title + '</h3>'
		html +=		'<p>' + bulletin.content + '</p>' 
		html +=		'<p>' + bulletin.signed + '</p>' 
		html += '</div>'
	}
	bulletinBoardEl.innerHTML = html
}

var fetchAndRenderBulletins = function() {
	$.get('https://tiy-bulletin-board.herokuapp.com/api/bulletin')
		.then(handleResponse)

	bulletinBoardEl.innerHTML = '<img src="Loading_icon.gif">'
}

// CODE TO POST A BULLETIN

var formEl = document.querySelector('form')

var handleFormSubmit = function(eventObj) {
	eventObj.preventDefault()
	var bulletinObject = {
		title: eventObj.target.title.value,
		content: eventObj.target.content.value,
		signed: eventObj.target.signed.value
	}
	$.post('https://tiy-bulletin-board.herokuapp.com/api/bulletin',bulletinObject)
		.then(fetchAndRenderBulletins)
	eventObj.target.reset()
}

formEl.onsubmit = handleFormSubmit // sets up handleFormSubmit to run when the "submit" button is clicked

fetchAndRenderBulletins()


