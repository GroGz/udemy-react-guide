const numbers = [1, 2, 3];
const double = numbers.map((el) => 2 * el);
console.log(numbers);
console.log(double);


console.log('Pair numbers', numbers.filter(el => el % 2 === 0));

console.log(
    "Sum",
    numbers.reduce((el, sum) => el + sum)
);