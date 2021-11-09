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
* More than one _useState_ can be used in every component
  * Other way is create an object with all the prop values to evaluate
    * Use spread operator to clone the old object and modify
    * To get the real last object, use _useState(prevState)_ instead _useState_
* It's used to implement two-way binding with forms

It works like a handler, when we change the prop value by the setProp method, the component is re-evaluated.

```js
import React, { useState } from 'react';

 const [title, setTitle] = useState(props.title);

   const clickHandler = () => {
     setTitle("Updated!");
   };
```

_useState_ only update var value the first time that the component is evaluated, next times only setProp will update the value.

## Form event

Events can be applied to a form, and _useState_ will work, but we need to capture the data included in the event

```js
const titleChangeHandler = (event) => {
        console.log(event.target.value);
    }

  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} />
```

There is no problem to use one _useState_ for every form event/field (Max favourite)

```js
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
```

But there is other solution, one _usecase_ with and object containing all the fields.

```js
const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
  });

  const titleChangeHandler = (event) => {
    setUserInput({ ...userInput, enteredTitle: event.target.value });
  };

  const amountChangeHandler = (event) => {
    setUserInput({ ...userInput, enteredAmount: event.target.value });
  };

  ```
  
Spread operator is used to clone de _userInput_ object and change only the element that rise the event.

But this is not working ok in all cases, with too many updates it's possible that the previous value is not updated, but there is a better solution.

```js
const titleChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };
  ```

  _prevState_ ensure that it is the last updated value. I applies when we use multiple useState

  For complex _states_ or that depnds on another _states_ use [Reducers](Reducers.md)

## Form. Two-way binding

The best place to check the submit event is in the \<form></form> tag, because button has its own implemented behaviour in the browser. Although submit event launch a web reload, this is not desirable and we can disable it.

```js
const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
    ...
    </form>
```

To get the data submitted, we only have to read the _useSatate_ props.

```js
  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    console.log(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };
```

And we can use the same props to reset values in the form, binding the _value_ attribute from form inputs and using setProps methods in submit event to reset them. This is the two-way binding.

```js
<form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
```

## Form. Child to parent communication

Yo can pass data from parent to children, through props, but from chlidren to parent. The solution is pass function as props from parent to children, then they can be launched from children to be executed at parent and accepts parameters

```js
const NewExpense = () => {

  const onSaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    console.log('Expenses ', enteredExpenseData);
  } 

    return (
      <div className="new-expense">
        <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} />
      </div>
    );
};
```

Prop _onSaveExpenseData_ pass _onSaveExpenseDataHandler_ to chldren _ExpenseForm_, and  it is launched from _submitHandler_ and with new data from form.

```js
const ExpenseForm = (props) => {
  ...

  const submitHandler = (event) => {
      event.preventDefault();

      const expenseData = {
        title: enteredTitle,
        amount: enteredAmount,
        date: new Date(enteredDate),
      };

      props.onSaveExpenseData(expenseData);
      ...
    };
}
```

Now, we have to do the same to pass enteredExpenseData to App.js to add to the expense array.

The complete schema moving the data from entry component to display component

Lifting state up (child to parent)
> ExpenseForm => NewExpense => App

Normal flow (parent to child)
> App => Expenses => ExpenseItem
