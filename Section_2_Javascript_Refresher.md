# Javascript ES6

## Resources

<https://jsbin.com/?js,console>

VsCode Extension => Quokka

## let & const

* _let_ for var
* _const_ for constants

[example](./Section_2_Javascript_Refresher/letConst.js)

## Function arrow

We can declare a function as the usual way or with function arrow

Usual

```javascript
function printMyName(name) {
    console.log(name);
}
printMyName('GroGz')
```

Arrow

```javascript
const printMyName = (name) => {
    console.log(name);
}
printMyName('GroGz')
```

* Parameters surrounded with _( ... )_
  * With no params empty ( )
  * With one param we can skip (name)
  * With multiple params (name, surname)
* Arrow precede function body _=>_
* If function only returns a value we can compress
  * ( number ) => number * 2;
  
[example](./Section_2_Javascript_Refresher/arrowFunction.js)

## Import & Export

We can export all file content or only some constants

_default_ for imported const without target

```javascript
const person = {
    name: 'GroGz'
}

export default person
```

```javascript
const clean = () => { ... }

export const baseData = 10;
```

Imports

* import person from './person.js'
* import prs from './person.js'
* import {baseData} from './utility.js'
* import {baseData as bd} from './utility.js'
* import * as bundled from './utility.js'

[example](./Section_2_Javascript_Refresher/importExport.js)
[person.js](./Section_2_Javascript_Refresher/person.js)
[utility.js](./Section_2_Javascript_Refresher/utilityjs)

## Classes

Classes have methods, properties, constructors, can extend from another class, and are initialized by __new__

```javascript
class Person extends Human {
    constructor() {
        super();
        this.name = 'GroGz';
    }

    printName() {
        console.log(this.name);
    }
}

const person = new Person();
```

[example](./Section_2_Javascript_Refresher/classes.js)

Since ES7 we can skip constructor, this and use arrow functions

[example](./Section_2_Javascript_Refresher/classesES7.js)

```javascript
class Person extends Human {
  name = "GroGz";

  printName = () => {
    console.log(this.name);
  }
}
```

## Spread operator _..._

Add more elements to a array or object and its very useful for copy an object

```javascript
const one = [1,1,1,];
const onetwo = [...one,2];

const person = {name: 'GroGz'};
const experson = {...person,age: 23};

```

onetwo will be [1,1,1,2]

## Rest operator _..._

As java _var args_ multiple elements as parameters

```javascript
const filter = (...args) => {
  return args.filter(el => el === 1)
}
console.log(filter(1,2,3));
```

[example](./Section_2_Javascript_Refresher/SpreadRest.js)

## Destructuring

Get array/object elements to vars

```javascript
const  numbers = [1,2,3];
[num1, num2] = numbers
[num1, ,num3] = numbers
console.log(num1, num2, num3);
```

[example](./Section_2_Javascript_Refresher/destructuring.js)

## Array functions

Functions that aplies another fucntion to array(object elements)

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array>

* _map_
* _find_
* _findIndex_
* _filter_
* _reduce_
* _concat_
* _slice_
* _splice_

```javascript
const  numbers = [1,2,3];
const double = numbers.map(el => 2 * el);
console.log(numbers);
console.log(double);
```

## Template literlas (backstick)

Text with dynamic content

* Text inside bacstick  _``_
* Var, function or js expresion inside _${}_
  
  ```js
  `Hello ${name}`;
  `Hello ${getGreeting('WW')}`
  `Hello ${isTrue(x) ? name : 'XXX'}`;
  ```

* Nested expressions are valid
  
  ```js
  `Hello GroGZ ${`${isTrue(false) ? "YYY" : "XXX"}`}  `;
  ```

* Tags allow you to parse template literals with a function.
  
  ```js
  function myTag(strings, personExp, ageExp) {
    ...
  }
  let output = myTag`That ${ person } is a ${ age }.`;
  ```

  * The first argument of a tag function contains an array of string values.
  * The remaining arguments are related to the expressions.
