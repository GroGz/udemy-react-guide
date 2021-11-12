# Reducers

Sometimes `useState`is not enough, because we have multiple _states_, multiple ways of changing or with dependencies in other _states_.

For these cases, we have another hook, `useReducer`.

This is are two examples of states that depends in other states, and as we see, this has some problems (`prevState`).

```js
const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      enteredEmail.includes('@') && event.target.value.trim().length > 6
    );
  };
```

```js
const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };
```

## useReducer

> const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);

* `state` is the snapshot used in the component for the re-evaluation/re-render cycle
* `dispatchFn` function that can be used to dispatch a new action (i.e. trigger a state update)
* `reducerFn` function launched by `disptchFn`, it receives the last state _snapshot_ and returns the __new updated state__
* `initialState` Additional info
* `initFn` Auxiliar function

```js
import React, { useState, useEffect, useReducer } from "react";

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
```

`reducerFn` declaration, where `state` is the previous _state_ and action contains the new info

```js
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  else if (action.type === "INPUT_BLUR") {
     return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
```

This function starts the action through `dispatchFn` when _email_ value is changed, and we use `emailState` to modify `setFormIsValid`because this value is controlled by react, and is 100% sure.

```js
const emailChangeHandler = (event) => {
   dispatchEmail({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(
     event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };
```

We can call the same function from different places

```js
  const validateEmailHandler = () => {
   dispatchEmail({type: 'INPUT_BLUR'})
  };
```

New _states_ in HTML form `emailState.isValid` and `value={emailState.value}`

```html
 <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
```

And we can do the same to other states.

## Integrate with userEffect -> Object destructuring

We only have to change the dependencies for  `emailState` and  `passwordState`

```js
useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailState, passwordState]);
```

This solution can be better, because we are validating again password every time, even when we add more chars when password has more than one char.

`Object destructuring`

```js
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
```

Every time the component is re-evaluated by a relevant change, we are taking the last `emailState.isValid, passwordState.isValid` values, but only when the valid prop changes, we execute the `useEffect` executes

## Adding newsted properties as dependencies to use useEffect (course content)

In the previous lecture, we used object destructuring to add object properties as dependencies to `useEffect()`.

```js
const { someProperty } = someObject;
useEffect(() => {
  // code that only uses someProperty ...
}, [someProperty]);
```

This is a __very common pattern and approach__, which is why I typically use it and why I show it here (I will keep on using it throughout the course).

I just want to point out, that they __key thing is NOT that we use destructuring__ but that we __pass specific properties instead of the entire object__ as a dependency.

We could also write this code and it would __work in the same way__.

```js
useEffect(() => {
  // code that only uses someProperty ...
}, [someObject.someProperty]);
```

This works just fine as well!

But you should __avoid__ this code:

```js
useEffect(() => {
  // code that only uses someProperty ...
}, [someObject]);
```

Why?

Because now the __effect function would re-run whenever ANY property__ of `someObject` changes - not just the one property (`someProperty` in the above example) our effect might depend on.
