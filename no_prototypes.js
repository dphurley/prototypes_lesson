var people = [];

console.log(people);

var paul = {
	"firstName": "Paul",
	"lastName": "Westerberg"
}

people.push(paul);

console.log(people);

/*
  ...... DO SOME OTHER THINGS, 
  NOW WE NEED ANOTHER PERSON .......
*/

tommy = {
	"firstName": "Tommy",
	"lastName": "Stinson",
	"age": 42
}

people.push(tommy);

console.log(people);

people.forEach(function (person) {
	console.log("Name: ", person.firstName, person.lastName);
	console.log("Age: ", person.age);
});