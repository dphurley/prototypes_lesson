- We want to sell paint

- Build paint cart as empty array

	var paintCart = [];

- Built first Store PaintColor json object and push to cart

	var firstPaintColor = {
		'name': 'Ruby Red',
		'type': 'StoreColor',
		'gallons': 1
	};
	cart.push(firstPaintColor);

- DISPLAY THE CART - console.log name, type, gallons for each paint color in cart

	console.log('CART:');
	cart.forEach(function (paintColor) {
		console.log('-----------------------------');
		console.log('Name: ' + paintColor.name);
		console.log('Type: ' + paintColor.type);
		console.log('Amount: ' + paintColor.gallons + ' Gallon(s)');
		console.log('-----------------------------');
	});

- IT WORKS! Now we add another...

- Build second Store PaintColor json object and add to cart
	
	var secondPaintColor = {
		'name': 'Blue Velvet',
		'type': 'StoreColor',
		'gallons': 3,
		'quarts': 2
	};
	cart.push(secondPaintColor);

- WE HAVE A PROBLEM - We want to show total gallons but quarts are not factored in for new color

- Options: 
	- Calculate total gallons before building the object
	- Add a fxn to the second color that calculates total gallons
		- We would have to add this fxn to every color with quarts. 
		- If it changes, we have to change it everywhere.
		- Not every object would have this, so we would have to use either it or just gallons,
		  depending on the presence of the fxn.
	- We could also put some complex logic in the forEach() loop that does calculations
	  if the color has quarts

- OR USE PROTOTYPES! WE WILL USE PROTOTYPES

- NEW FILE
- Build paint cart as empty array

	var paintCart = [];

- Build PaintColor as a prototype with only name, type, and gallons

	function PaintColor(name, type, gallons) {
		this.name = name;
		this.type = type;
		this.gallons = gallons;
	}

- Create firstPaintColor and add to cart

	var firstPaintColor = new PaintColor(
		"Ruby Red",
		"StoreColor", 
		1
	)
	cart.push(firstPaintColor);

- DISPLAY THE CART - console.log name, type, gallons for each paint color in cart

	console.log('CART:');
	cart.forEach(function (paintColor) {
		console.log('-----------------------------');
		console.log('Name: ' + paintColor.name);
		console.log('Type: ' + paintColor.type);
		console.log('Amount: ' + paintColor.gallons + ' Gallon(s)');
		console.log('-----------------------------');
	});

- Create secondPaintColor with quarts and add to cart

	- Need to update the Constructor for new attribute 'quarts'
		
		function PaintColor(name, type, gallons, quarts) {
			this.name = name;
			this.type = type;
			this.gallons = gallons;
			this.quarts = quarts;
		}

	- Now create second paint color and add to cart

		var secondPaintColor = new PaintColor(
			"Blue Velvet", 
			"StoreColor",
			2, 
			3
		)
		cart.push(secondPaintColor);

	- 2 Gallons plus 3 Quarts is 2.75 gallons. We want to show that in the cart

	- Update Cart display and add totalGallons() fxn to prototype

		function PaintColor(name, type, gallons, quarts) {
			this.name = name;
			this.type = type;
			this.gallons = gallons;
			this.quarts = quarts;
			this.totalGallons = function () {
				return this.gallons + (this.quarts * 0.25);
			}
		}

		cart.forEach(function (paintColor) {
			console.log('---------------------------------');
			console.log('Name: ' + paintColor.name);
			console.log('Type: ' + paintColor.type);
			console.log('Amount: ' + paintColor.totalGallons() + ' Gallon(s)');
			console.log('---------------------------------');
		});

	- WE WILL HAVE A PROBLEM WHEN WE RUN THE CODE. WHO CAN TELL ME WHAT IT IS?

	- Problem will be that the first color has 'undefined' quarts. 
		- When we try to run totalGallons() for first line item, 1 + (undefined * 0.25)
		- (undefined * 0.25) = NaN
		- 1 + NaN = NaN

	- IMPORTANT - IF WE DO NOT SET AN ATTRIBUTE ON THE PROTOTYPE, IT WILL BE undefined

	- Update first item to match new interface

		var firstPaintColor = new PaintColor(
			"Ruby Red",
			"Store", 
			1, 
			0
		)

	- EVERYTHING SHOULD WORK NOW

- NOW WE HAVE A SPECIAL ORDER ONLY COLOR

- This color has all of the attributes of an In-Store color, but also has Vendor info

- Create SpecialOrderPaintColor prototype that inherits from PaintColor

	- Type will always be SpecialOrder, so we can default the value without having to pass it in

		function SpecialOrderPaintColor(name, gallons, quarts, vendorName) {
			PaintColor.call(this, name, "SpecialOrder", gallons, quarts);
			this.vendorName = vendorName;
		}
		SpecialOrderPaintColor.prototype = Object.create(PaintColor.prototype)

- Add thirdPaintColor which is a SpecialOrderPaintColor

	var thirdPaintColor = new SpecialOrderPaintColor(
		"Rare Green",
		4,
		1,
		"Sherwin-Williams"
	)
	cart.push(thirdPaintColor);

- We can add some simple display logic to show attributes based on type now
		
	console.log('CART:');
	cart.forEach(function (paintColor) {
		console.log('---------------------------------');
		console.log('Name: ' + paintColor.name);
		console.log('Amount: ' + paintColor.totalGallons() + ' Gallon(s)');
		console.log('Type: ' + paintColor.type);
		if(paintColor.type === 'SpecialOrder') {
			console.log('Vendor Name: ' + paintColor.vendorName);
		}
		console.log('---------------------------------');
	});