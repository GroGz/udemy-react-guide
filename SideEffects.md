# Side Effects

Every action to respond an action is a side effect.

React handles how data is painted at the screen, and how _components_ communicate with other _components_, but in an application, there are more jobs to be done, this jobs and their results, are `side effects`. For example, _http_ calls are outside React controll, and we have to be careful with them because they can produce unexpected behaviours.

One side effect is that every time the app resets, we lose all the _states_.

```js
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  };
```

We can avoid this storing a persistent value in _localstorage_

```js
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  if (storedUserLoggedInInformation === '1') {
    setIsLoggedIn(true);
  }

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem(isLoggedIn, '1');
  };
```

But, what happens if a component is re-evaluated every time that a var changes `setState`, and that var is changed every time the component calls http to get the var value? We have a loop, because _component_ will be re-evaluated.

## UseEffect

`useEffect` is executed only after render cycle and when some conditions apply.

> useEffect( () => { ... }, [dependencies]);

* A function that is executed AFTER every component evaluation IF the specified dependencies changed
* Dependencies that launch the function when they change

```js
useEffect( () => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);
```

This code only will be executed first time, because `dependencies []`  never change.

## Dependencies

If we don't use `useEffect` we can create a loop every time the component is re-evaluated, with `useEffect`  and `no dependencies []` only at start, but if we want to re-evaluate more times.

Then we have to add as dependencies `states or props` what we are using in the side effect function.

```js
const Login = (props) => {
  ...
  useEffect(() => {
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  },[setFormIsValid, enteredEmail,enteredPassword]);
```

The setFormIsValid is in dependencies, because we want that `Login component` will be rendered everyt time `setFormIsValid` or `enteredEmail` or `enteredPassword` changes.

In this case __we can ommit__ `setFormIsValid` because it is not changed outside `useEffect`.

Why is this case a side effect? There is no http calls, but listening to events are side effects.

## What to add & Not to add as Dependencies (Course content)

In the previous lecture, we explored `useEffect()` dependencies.

You learned, that you should add "everything" you use in the effect function as a dependency - i.e. all state variables and functions you use in there.

That is correct, but there are a __few exceptions__ you should be aware of:

* You __DON'T need to add state updating functions__ (as we did in the last lecture with `setFormIsValid`): React guarantees that those functions never change, hence you don't need to add them as dependencies (you could though)

* You also __DON'T need to add "built-in" APIs or functions__ like `fetch(), localStorage` etc (functions and features built-into the browser and hence available globally): These browser APIs / global functions are not related to the React component render cycle and they also never change

* You also __DON'T need to add variables or functions you might've defined OUTSIDE of your components__ (e.g. if you create a new helper function in a separate file): Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa)

So long story short: You must add all "things" you use in your effect function if those "things" could change because your component (or some parent component) re-rendered. That's why variables or state defined in component functions, props or functions defined in component functions have to be added as dependencies!

Here's a made-up dummy example to further clarify the above-mentioned scenarios:

```js
import { useEffect, useState } from 'react';
 
let myTimer;
 
const MyComponent = (props) => {
  const [timerIsActive, setTimerIsActive] = useState(false);
 
  const { timerDuration } = props; // using destructuring to pull out specific props values
 
  useEffect(() => {
    if (!timerIsActive) {
      setTimerIsActive(true);
      myTimer = setTimeout(() => {
        setTimerIsActive(false);
      }, timerDuration);
    }
  }, [timerIsActive, timerDuration]);
};
```

In this example:

* `timerIsActive` is __added as a dependency__ because it's component state that may change when the component changes (e.g. because the state was updated)

* `timerDuration` is __added as a dependency because__ it's a prop value of that component - so it may change if a parent component changes that value (causing this MyComponent component to re-render as well)

* `setTimerIsActive` is __NOT added as a dependency__ because it's that __exception__: State updating functions could be added but don't have to be added since React guarantees that the functions themselves never change

* `myTimer` is __NOT added as a dependency__ because it's __not a component-internal variable__ (i.e. not some state or a prop value) - it's defined outside of the component and changing it (no matter where) __wouldn't cause the component to be re-evaluated__

* `setTimeout` is __NOT added as a dependency__ because it's a __built-in API__ (built-into the browser) - it's independent from React and your components, it doesn't change

## CleanUp function

In this examples, every keystroke launch a validation, an this behaviour can produce a lot of load cost, checkint the validation or because it starts an _http_ call, for example.

If we want to delay the action (`debouncing`) we add a timer to wait to X seconds of inactivity.

```js
useEffect(() => {
    setTimeout(() => {
      console.log("Validating form!");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500)
  },[enteredEmail,enteredPassword]);
```

But this is only a delay, we log every keystroke.

`useEffect` admits to return a function, and this fucntion called `cleanUp` will be executed before the next time that `useEffect` runs. When we have a timer running, we can use that function to cancel the timer.

```js
useEffect(() => {
  ....

 return (() => {
      console.log('CLEANUP!');
      clearTimeout(identifier);
    });
},[enteredEmail,enteredPassword]);
```
