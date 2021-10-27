const one = [1, 1, 1];
const onetwo = [...one, 2];

const person = { name: "GroGz" };
const experson = { ...person, age: 23 };


console.log(onetwo);
console.log(experson);

console.log('Rest example');

const filter = (...args) => {
  return args.filter((el) => el === 1);
};
console.log(filter(1, 2, 3));