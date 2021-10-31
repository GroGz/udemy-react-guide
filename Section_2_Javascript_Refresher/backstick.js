
const name = "GroGz";
const getGreeting = (surname) => {
  return 'GzGro ' + surname;
};
const isTrue = (isTrue) => {
    return isTrue;
} 

const greeting = `Hello ${name}`;

const greetingFunc = `Hello ${getGreeting()}`;
const greetingFunc2 = `Hello ${getGreeting('WW')}`;
//Not valid
//const greetingFunc2 = `Hello ${getGreeting(${name })}`;

const greetingTerTrue = `Hello ${isTrue(true) ? name : 'XXX'}`;
const greetingTerFalse = `Hello ${isTrue(false) ? name : "XXX"}`;

const greetingNested = `Hello GroGZ ${`${isTrue(false) ? "YYY" : "XXX"}`}  `;


console.log(greeting);
console.log(greetingFunc);
console.log(greetingFunc2);

console.log(greetingTerTrue);
console.log(greetingTerFalse);

console.log(greetingNested);

let person = "Mike";
let age = 28;

function myTag(strings, personExp, ageExp) {
  let str0 = strings[0]; // "That "
  let str1 = strings[1]; // " is a "
  let str2 = strings[2]; // "."

  let ageStr;
  if (ageExp > 99) {
    ageStr = "centenarian";
  } else {
    ageStr = "youngster";
  }

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

let output = myTag`That ${person} is a ${age}.`;

console.log(output);