# Events & State

## Events

All the events for node elements can be used in react.

As an attribute with the name preceded by on, and executing a function

const ExpenseItem = (props) => {
  const clickHandler = () => {
    console.log("Click!!");
  };

```js
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={console.log("Click!!")}>Change Title</button>
    </Card>
  );
};
```

Functions can be online or declared, but only pointed

```js
const clickHandler = () => {console.log("Click!!")};

<button onClick={clickHandler} >Change Title</button>
<button onClick={ () => {console.log("Click!!")} } >Change Title</button>
```

It's always executed on load
> \<button onClick={clickHandler()} >Change Title</button>

Components are functions, and functions only are executed when they are called, then it is not enough to update the value of a param used as dynamic data in a JSX

This didn't work

```js
 let title = props.date;

 const clickHandler = () => {
    title = 'Goodbye';
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={title} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
};
```

The solution comes with _state_

## State

To update a component,  _useState_ function

_useState_ function

* Import from React dependency
* Is a React hook
  * All hooks start with _use_
  * It only can be used inside a component
* Returns a pair, last prop value and a method to set prop

It works like a handler, when we change the prop value by the setProp method, the component is re-evaluated.

```js
import React, { useState } from 'react';

 const [title, setTitle] = useState(props.title);

   const clickHandler = () => {
     setTitle("Updated!");
   };
```

_useState_ only update var value the first time that the component is evaluated, next times only setProp will update the value.
