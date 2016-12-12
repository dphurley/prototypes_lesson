function Person(firstName, lastName, zipCode) {
	this.firstName = firstName
	this.lastName = lastName
	this.zipCode = zipCode
	this.name = function () {
		return this.firstName + ' ' + this.lastName
	}
}

function Employee(firstName, lastName, title) {
	Person.call(firstName, lastName);
	this.title = title;
}

var paul = new Person('Paul', 'Westerberg');
var janitor = new Employee('Tommy', 'Stinson', 'Maintenance Engineer');
var flightAttendant = new Employee('Bob', 'Stinson', 'Waitress In The Sky');

console.log(paul.name());
console.dir(paul);
console.log(janitor.title);
console.log(flightAttendant.title);
console.log(paul.toString());