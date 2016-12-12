var cart = [];

var firstPaintColor = {
	'name': 'Ruby Red',
	'color': 'red',
	'gallons': 1
};
cart.push(firstPaintColor);

var secondPaintColor = {
	'name': 'Blue Velvet',
	'color': 'blue',
	'gallons': 3,
	'quarts': 2
};
cart.push(secondPaintColor);

cart.forEach(function (paintColor) {
	console.log('Name: ' + paintColor.name);
	console.log('Color: ' + paintColor.color);
	console.log('Amount: ' + paintColor.gallons + ' Gallon(s)');
});