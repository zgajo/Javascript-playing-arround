//gets a new object (the arhitecture allows us to not have to use the 'new' keyword here)
let g = new G$('John', 'Doe')

//use chainable methods 
g.greet().greet(true).log()

$('#login').click(function(){

	//create a 'new' Greetr object
	var loginGrtr = G$('John', 'Doe')

	$('#logindiv').hide()

	//fire off an TML greeting, passing #greeting as the selector and the chosen language, and log welcome as well
	loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
})