# Hooks

[Rules of hooks](./Section_10_Side_Effects_Reducers_Context_API/rules-of-hooks.pdf)

* `useState, useEffect, useReducer, useContext`
* start with `use`
* Call them only inside React Functions
  * Component functions
  * Custom hooks
* Only calls at the top level
  * Not in nested functions (inside other hook)
  * Not in block statements (if)
* `useEffect`add always sused _states_ as dependencies

## useImperativeHandle and React.forwardRef

* Import `useImperativeHandle`
* Have two parameters
  * useImpreativeHandle(ref,()=> return {focus:activate})
    * A function that returns an object with the va/method that we want to use
    * The ref from the parent object
      * Input = (props, ref ) =>
* And a React funciton that creates a component that admits _ref_
  * const Input = React.forwardRef((props, ref=> {...}))

It is a new hook, that allows control _component_ without _state_ or _props_

Enable always the `Login button` and control the validation in method, because the we try to focus the email when it is not valid.

> \<Button type="submit" className={classes.btn} ~~disabled={!formIsValid}>~~

In `Input` we use `useRef and useEffect` to get the DOM node to call focus

```js
const Input = (props) => {
    const inputRef = useRef();
    
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  ....
   <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />

```

Now, at first load we are focused at password becasue it was the last rendered, but it is not what we want.

Maybe we want to try by removing `useEffect` and creating a vanilla js method, and pass _ref_ from parent and call that method from parent, witha a _ref_ to the component that has a _ref_ to the _input_

```js

const Input = (props) => {
  const inputRef = useRef();

  const activate = () => {
      inputRef.current.focus();
    };
```

```js
  <Input
          ref={emailInputRef}
          id="email"
          lable="E-mail"
          type="email"
```

It doesn't work because __components don't admit refs__

Then we use `useImperativeHandle` and `React.forwardRef`

```js
useImperativeHandle(ref, () => {
        return { focus: activate }
    });
```

`useImperativeHandle` receives a _ref_ to the parent component `ref={emailInputRef}` and a function with an object with the methods/var that we want to call form outside.

`ref` comes from the component

> const Input = (props, ref) => {

But it is not enough, we have to use a React function that creates a _component_ that admits ref, with `React.forwardRef`

and now will work

```js
else if (!emailIsValid){
      emailInputRef.current.focus();
    }
```

focus is the methos name in the object that `useImperativeHandle` returns
