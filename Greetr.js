(function(global, $){

	var Greetr = function(firstName, lastName, lang){
		// 'new' an object
		return new Greetr.init(firstName, lastName, lang)
	}

	//hidden withinthe scope of the IIFE and never directly accesible
	var supportedLanguages = ['en', 'hr'];

	// informal greeting
	var greetings = {
		en: 'Hello',
		hr: 'Zdravo'
	};

	//formal greeting
	var formalGreetings = {
		en: 'Greetings',
		hr: 'Dobar dan'
	};

	// logger messages 
	var logMessages = {
		en: 'Logged in',
		hr: 'Prijavljeni ste'
	};

	// prototype holds methods (to save memory space)
	Greetr.prototype = {

		// 'this' refers ti the calling object at eecution time
		fullName: function(){
			return this.firstName + ' ' + this.lastName;
		},

		validate: function(){
			//check that is a valid language
			if (supportedLanguages.indexOf(this.language) === -1) {
				throw 'Invalid language';
			}
		},

		//retreive messages from object by referring to properties using [] syntax
		greeting: function(){
			return greetings[this.language] + ' ' + this.fullName();
		},

		formalGreeting: function(){
			return formalGreetings[this.language] + ', ' + this.fullName();
		},

		// chainable method, because it returns 'this' (their own containing object) 
		greet: function(formal, selector){	
			var msg;

			if(formal) msg = this.formalGreeting();
			else msg = this.greeting();

			if(console) console.log(msg);

			//inject the message in the chosen place in the DOM
			$(selector).html(msg)

			//'this' refers to the calling object at execution time
			// makes method chainable
			return this;
		},

		log: function(){
			if(console){
				console.log(logMessages[this.language] + ': ' + this.fullName())
			}
			return this;
		},

		setLang: function(lang){
			this.language = lang;
			this.validate();

			return this;
		},

		HTMLGreeting: function(selector, formal){
			if(!$) throw 'jQuery not loaded';
			if(!selector) throw 'Missing HTML selector';

			this.greet(formal, selector)

			return this;
		}

	};

	//the actual object is created here, allowing us to 'new' an object without calling new
	Greetr.init = function(firstName, lastName, lang){

		var self = this; 

		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.language = lang || 'en';

		self.validate();
	}

	// trick borrowed from jQuery so we don't have to use 'new keyword'
	Greetr.init.prototype = Greetr.prototype;

	global.Greetr = global.G$ = Greetr;

})(window, jQuery)