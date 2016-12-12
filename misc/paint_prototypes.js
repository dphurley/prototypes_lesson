var paintCart = [];

function PaintColor(name, type, gallons, quarts) {
	this.name = name;
	this.type = type;
	this.gallons = gallons;
	this.quarts = quarts;
	this.totalGallons = function () {
		return this.gallons + (this.quarts * 0.25);
	}
}

function SpecialOrderPaintColor(name, gallons, quarts, vendorName) {
	PaintColor.call(this, name, "SpecialOrder", gallons, quarts);
	this.vendorName = vendorName;
}
SpecialOrderPaintColor.prototype = Object.create(PaintColor.prototype)

var firstPaintColor = new PaintColor(
	"Ruby Red",
	"InStock", 
	1, 
	0
)
paintCart.push(firstPaintColor);

var secondPaintColor = new PaintColor(
	"Blue Velvet", 
	"InStock",
	2, 
	3
)
paintCart.push(secondPaintColor);

var thirdPaintColor = new SpecialOrderPaintColor(
	"Rare Green",
	4,
	1,
	"Sherwin-Williams"
)
paintCart.push(thirdPaintColor);

console.log('CART:');
paintCart.forEach(function (paintColor) {
	console.log('---------------------------------');
	console.log('Name: ' + paintColor.name);
	console.log('Amount: ' + paintColor.totalGallons() + ' Gallon(s)');
	console.log('Type: ' + paintColor.type);
	if(paintColor.type === 'SpecialOrder') {
		console.log('Vendor Name: ' + paintColor.vendorName);
	}
	console.log('---------------------------------');
});