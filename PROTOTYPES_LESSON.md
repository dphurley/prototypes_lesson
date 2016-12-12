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
	'type': 'InStore',
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
	'type': 'InStore',
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
- For the sake of simplicity, for now we will update the first item to match our new interface
```javascript
var firstPaintColor = new PaintColor(
	"Ruby Red",
	"Store", 
	1, 
	0
)
```

</details>
 

### EVERYTHING SHOULD WORK NOW

--------  
  
### NOW WE HAVE A SPECIAL ORDER ONLY COLOR

### This color has all of the attributes of an In-Store color, but also has Vendor info

### Create a new SpecialOrderPaintColor constructor
```javascript
function SpecialOrderPaintColor(name, type, gallons, quarts, vendorName) {
	this.name = name;
	this.type = type;
	this.gallons = gallons;
	this.quarts = quarts;
	this.vendorName = vendorName;
}
```

### We just typed a lot, and it looks like a lot of it is the same as PaintColor

### First problem... Will the 'type' ever change? 

### Nope, we can default that value. One less thing to pass in.
```javascript
function SpecialOrderPaintColor(name, gallons, quarts, vendorName) {
	this.name = name;
	this.type = 'SpecialOrder';
	this.gallons = gallons;
	this.quarts = quarts;
	this.vendorName = vendorName;
}
```

### SpecialOrderPaintColor really IS a PaintColor, though. It just has some additional info, too.
### We've already built most of the same code we just typed in the PaintColor constructor, and it has a ```totalGallons()``` method that it would be nice to use for SpecialOrderPaintColors as well.

### So let's use Inheritance

- Inheritance allows us to use all of the attributes of another object, without changing that object to fit a very specific use case.

- Good examples of Inheritance:
	- Person -> Employee : People have 'names', employees have 'names', employees are people. Employees also have a 'title', though, and not all people do. An Employee should be able to use the 'name' attribute from People without requiring all People to have a 'title.'
	- Bear -> GrizzlyBear : A GrizzlyBear is a Bear, and as such it should be able to ```.roar()``` like a Bear.
	
```

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
paintCart.push(thirdPaintColor);
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

----- 
### SUMMARY

### Benefits of using Prototypes:
- We have a clean definition of what attributes a thing should have. If we use a constructor, we don't have to worry about forgetting attributes when creating multiple objects of the same type.
- We can put functions directly on prototypes that are available anywhere we have an object of its type. (We can DRY our code up!)
- We can use inheritance!

### Benefits of using inheritance:

- IF we change the method definition of totalGallons() on PaintColor, it will change for all SpecialOrderPaintColors as well. We not only have once source of truth for how to do a complicated calculation.
- Conversely, if we need to add a new field to SpecialOrderPaintColor, we only have to update those objects. 

### Things to watch out for:
- Remember! If you change a constructor, you will have to update everywhere you are using that constructor.
- This might be overkill in some cases! Prototypes come with the overhead of having to maintain your constructor definition. If you don't need many objects of the same type OR your object is very simple, JSON objects can work just fine.

### Explore:
- What would happen if we redefined ```this.totalGallons``` on SpecialOrderPaintColor to be a different ```function```?
- What would happen if we defined ```this.name``` on SpecialOrderPaintColor after calling the PaintColor prototype?
- Are there any elegant ways we could handle missing values within the constructor? What if we wanted quarts to default to 0 when no quart value is passed in.
