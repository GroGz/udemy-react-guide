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
* Dynamic data is converted into value whith varname surrounded with {}
  * \<div className={classes} style={{ height: varToConvert }}>{props.children}</div>;
    * Double curly brackets for attributes that has curly brackets.
* _.children_ contains inner content of parent tag.

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
```

Component structure shows dynamic data inside curly brackets, it can be a var/const, an js expression or a function result
> \<h2>{expenseTitle}\</h2>
> \<h2>{1+1}\</h2>
> \<h2>{expenseDate.toISOString()}\</h2>
> \<div className="chart-bar__fill" style={{ height: barFillHeight }} ></div>

When we want to add info to an attribute that has curly brackets, use double curly brackets.

```js
<div>
      <h2>Let's get started!</h2>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      ></ExpenseItem>
```

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

Those properties can be removed from other files as Expenses.css and ExpenseItem.css

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

To paint the dynamic data inside the wrapper, we have to use props.children, a reserved prop with the data of  inner components.

> return \<div className={classes}>{props.children}</div>;

We can use _prop.children_ to use generics buttons.

> \<Button type="submit">Add Goal</Button>

Button text _Add Goal_ is passed by _props.children_

> \<button type={props.type} className="button" onClick={props.onClick}>{props.children}</button>

## Fragments, Portals and Refs

* Fragment: Light wrapper
* Portal: Set component in the correct node tree place
* Ref: Skip unnecessary _state_ to read values from HTML tag, as input.
  * _Uncontrolled components_ because React doesn't control the elemnt state

[Fragments, Portals and Refs](Fragments%26Portals%26Refs.md)

## Images

We can import images as another react component

```js
import mealsImage from '../../assets/melas.jpg';

const Header = props => {
    return <>
        <header>
            <h1>ReactMeals</h1>
            <button>Cart</button>
        </header>
        <div>
            <img src={mealsImage} alt='A table with food'/>
        </div>
    </>
```

Another way to add images, inline images with svn

```js
const CartIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
    </svg>
  );
};
```

[Food App](Section_11_Practice_Project_Food_Order.md)

## Adding attributes to html elements

Instead of add all the attributes one by one, we can use _destructuring_ operator

```js
const Input = props => {

    return (<div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input  {...props.input} />
    </div>)
}
```

> \<input id="amount" type="number" min="1" max="6" step="1" value="1">

With the current implementation of MealItemForm, every `<Input />` receives the __same id__, as I do the following in the code I show in the previous lecture:

```js
<Input
    label='Amount'
    input={{
        id: 'amount',
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1',
    }}
/>
```

This works but it has __two major disadvantages__ which are not immediately obvious (and hence unfortunately slipped through during the recordings):

Clicking on ANY label will always select the same, first input element - even if that's not the one belonging to the actual MeatItem

Screenreaders won't be able to connect labels + inputs correctly (since all labels point at the same input)

Everything shown in the videos works as shown and fixing this is optional, but since fixing this is easy, you might want to consider making the below adjustments:

One possible workaround is to accept an id prop on the MealItemForm component and use that to create a unique id per `<Input />`:

```js
<Input
    label='Amount'
    input={{
        id: 'amount_' + props.id, // this changed!
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1',
    }}
/>
```

We just have to make sure that the id props is passed correctly to `<MealItemForm />` when that component is being used (i.e. inside of the MealItem component):

> \<MealItemForm id={props.id} />

Last but not least, for that to work, we should also pass id as a prop to MealItem, hence inside of the AvailableMeals component, we should create `<MealItem />` elements like this:

```js
<MealItem
    id={meal.id} // this is new!
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
/>
```

Again, this is all 100% optional when it comes to the general functionality of this demo app - everything works as shown in the videos without these changes as well. But for proper accessibility, you should consider making these adjustments.

I did also update all the code snapshots to reflect these changes.

[Food App](Section_11_Practice_Project_Food_Order.md)
