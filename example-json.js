/**
 * Created by david on 1/30/17.
 */
var person = {
    name: 'David',
    age: 35
};

var personJSON = JSON.stringify(person);

console.log(personJSON);

var personParsed = JSON.parse(personJSON);

console.log(personParsed.name);

console.log('Challenge Area!');

var animal = '{"name": "Phoenix"}';
// use JSONparse in a js object
// add age prop
//convert back to JSON and cl

var animalObject = JSON.parse(animal);

animalObject.age = 3;

animal = JSON.stringify(animalObject);

console.log(animal);
