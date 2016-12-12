# We want to sell paint  
  

### NEW FILE - no_prototypes.js

### Build paint cart as empty array

```javascript
var paintCart = [];
```

### Built first Store PaintColor json object and push to cart
```javascript
var firstPaintColor = {
	'name': 'Ruby Red',
	'type': 'StoreColor',
	'gallons': 1
};
paintCart.push(firstPaintColor);
```

### DISPLAY THE CART - console.log name, type, gallons for each paint color in cart
```javascript

console.log('CART:');
paintCart.forEach(function (paintColor) {
	console.log('-----------------------------');
	console.log('Name: ' + paintColor.name);
	console.log('Type: ' + paintColor.type);
	console.log('Amount: ' + paintColor.gallons + ' Gallon(s)');
	console.log('-----------------------------');
});
```
### Run it!
```javascript
node no_prototypes.js
```

### IT WORKS! Now we add another...

### Build second Store PaintColor json object and add to cart
```javascript	
var secondPaintColor = {
	'name': 'Blue Velvet',
	'type': 'StoreColor',
	'gallons': 3,
	'quarts': 2
};
paintCart.push(secondPaintColor);
```

### WE HAVE A PROBLEM - We want to show total gallons but quarts are not factored in for new color

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

-----

### NEW FILE - with_prototypes.js

### Build paint cart as empty array
```javascript
var paintCart = [];
```

### Build PaintColor as a prototype with only name, type, and gallons
```javascript
function PaintColor(name, type, gallons) {
	this.name = name;
	this.type = type;
	this.gallons = gallons;
}
```

### Create firstPaintColor and add to cart
```javascript
var firstPaintColor = new PaintColor(
	"Ruby Red",
	"StoreColor", 
	1
)
paintCart.push(firstPaintColor);
```

### DISPLAY THE CART - console.log name, type, gallons for each paint color in cart

```javascript
console.log('CART:');
paintCart.forEach(function (paintColor) {
	console.log('-----------------------------');
	console.log('Name: ' + paintColor.name);
	console.log('Type: ' + paintColor.type);
	console.log('Amount: ' + paintColor.gallons + ' Gallon(s)');
	console.log('-----------------------------');
});
```

### Create secondPaintColor - Except this one has quarts as well

- Need to update the Constructor for new attribute 'quarts'
```javascript
function PaintColor(name, type, gallons, quarts) {
	this.name = name;
	this.type = type;
	this.gallons = gallons;
	this.quarts = quarts;
}
```

- Now create second paint color and add to cart
```javascript
var secondPaintColor = new PaintColor(
	"Blue Velvet", 
	"StoreColor",
	2, 
	3
)
paintCart.push(secondPaintColor);
```

- 2 Gallons plus 3 Quarts is 2.75 gallons. We want to show that in the cart

- Update Cart display and add totalGallons() function to prototype
```javascript
function PaintColor(name, type, gallons, quarts) {
	this.name = name;
	this.type = type;
	this.gallons = gallons;
	this.quarts = quarts;
	this.totalGallons = function () {
		return this.gallons + (this.quarts * 0.25);
	}	
}
```

```javascript
cart.forEach(function (paintColor) {
	console.log('---------------------------------');
	console.log('Name: ' + paintColor.name);
	console.log('Type: ' + paintColor.type);
	console.log('Amount: ' + paintColor.totalGallons() + ' Gallon(s)');
	console.log('---------------------------------');
});
```
### WE WILL HAVE A PROBLEM WHEN WE RUN THE CODE. WHO CAN TELL ME WHAT IT IS?
<details> 
<summary><strong>The problem is...</strong></summary>
- The first color has 'undefined' quarts. We will need to set quarts for all PaintColors because we changed the definition. 
- When we try to run totalGallons() for first line item, 1 + (undefined * 0.25)
- ```(undefined * 0.25) = NaN```
- ```1 + NaN = NaN```
- THIS IS IMPORTANT! - IF WE DO NOT SET AN ATTRIBUTE ON A NEW INSTANCE OF A PROTOTYPE, IT WILL BE ```undefined```
</details>
  

- Update first item to match new interface
```javascript
var firstPaintColor = new PaintColor(
	"Ruby Red",
	"Store", 
	1, 
	0
)
```

### EVERYTHING SHOULD WORK NOW

--------  
  
### NOW WE HAVE A SPECIAL ORDER ONLY COLOR

### This color has all of the attributes of an In-Store color, but also has Vendor info

### Create SpecialOrderPaintColor prototype that inherits from PaintColor

	- Type will always be SpecialOrder, so we can default the value without having to pass it in
	```javascript
	function SpecialOrderPaintColor(name, gallons, quarts, vendorName) {
		PaintColor.call(this, name, "SpecialOrder", gallons, quarts);
		this.vendorName = vendorName;
	}
	SpecialOrderPaintColor.prototype = Object.create(PaintColor.prototype)
	```

### Add thirdPaintColor which is a SpecialOrderPaintColor
```javascript
var thirdPaintColor = new SpecialOrderPaintColor(
	"Rare Green",
	4,
	1,
	"Sherwin-Williams"
)
cart.push(thirdPaintColor);
```

### We can add some simple display logic to show attributes based on type now
```javascript		
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
```
