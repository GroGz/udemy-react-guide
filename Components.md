# Components

## Tips

* One file per component is a good approach
* Camelcase names
* Component is a js function that returns HTML code
* Component files no need extension to be imported
  * import App from './App';
* Component tag start with upercase
* Empty tags can be autoclosed \<Tag />
* Component function returns only one root element
* Components can be declared with arrow functions
  * const App = () => {}
  * const Expenses = (props) => {}

## Using component

First component App link to other components, we need to import new components and set their location

```js
import ExpenseItem from './Components/ExpenseItem';

function App() {
  return (
    <div>
      <h2>Let's get started!</h2>
      <ExpenseItem></ExpenseItem>
    </div>
  );
}
```

To set a component we use tags statrting with uppercase character, not lowercase as HTML tags.

Returned HTML code must have only one root element

Error

```js
function ExpenseItem() {
  return (
    <div><h2>One root element</h2></div>
    <div><h2>Another root element</h2></div>
  );
}
```

## Adding CSS

Css files have the same name as the component, and must be imported

> import './ExpenseItem.css';

To apply the look, _className_ attribute is used, because _class_ is a js reserved word.

```js
function ExpenseItem() {
  return (
     <div className="expense-item"></div>
  );
}
```

## Dynamic data _props_

A component is a js function, then we can pass parameters called _props_

> function ExpenseItem(props) {

_Props_ contains all the attributes declared in the JSX tag, and this is the way to pass parameters from the tag to the component structure

```js
const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    }
];

...

<div>
      <h2>Let's get started!</h2>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      ></ExpenseItem>
```

Component structure shows dynamic data inisde curly brackets, it can be a var/const, an js expression or a function result
> \<h2>{expenseTitle}\</h2>
> \<h2>{1+1}\</h2>
> \<h2>{expenseDate.toISOString()}\</h2>

## Splitting Components

When components grow up, we can split them

```js
import "./ExpenseItem.css";

function ExpenseItem(props) {
  const month = props.date.toLocaleString("es-ES", { month: "long" });
  const day = props.date.toLocaleString("es-ES", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className="expense-item">
      <div>
        <div>{day}</div>
        <div>{month}</div>
        <div>{year}</div>
      </div>
      <div className="expense-item__description">
      ...

export default ExpenseItem;
```

But we have to pass _props_ to the next component

```js
import ExpenseDate from "./ExpenseItem";
import "./ExpenseItem.css";

function ExpenseItem(props) {

  return (
    <div className="expense-item">
      <ExpenseDate date={props.date}/>
      <div className="expense-item__description">
      ...

export default ExpenseItem;
```

## Composition

Split requires composition, and because there is only one root element, there are a lot of components with a \<div> tag as a container. These containers can configured to be common an reduce duplicated code

Card.css

```css
.card {
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
}
```

Those proporties can be removed from other files as Expenses.css and ExpenseItem.css

```js
import "./Card.css";

function Card(props) {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Card;
```

To merge common style and wrapped style, we need to join both classes

> const classes = "card " + props.className;

To mantain the dynamic data inside the wrapper, we have to use props.children, a reserved prop with the data for the inner components.

> return \<div className={classes}>{props.children}</div>;
