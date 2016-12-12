var people = [];

function Person(firstName, lastName, age) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.name = this.firstName + ' ' + this.lastName;
	this.age = age;
}

var paul = new Person("Paul", "Westerberg", 47);
people.push(paul);

var tommy = new Person("Tommy", "Stinson", 41);
people.push(tommy);

var chris = new Person("Chris", "Mars", 44);
people.push(chris);

people.forEach(function (person) {
	console.log("########################");
	console.log("Name: ", person.name);
	console.log("Age: ", person.age);
	console.log("########################");
});