# Dynamic Styles

The first way to apply different styles to components, is using ternary expression with _style_ attribute or with conditional blocks and _className_

```js
<label style={{color: !isValid ? 'red' : 'black'}}>Course Goal</label>
```

With inline approach, we have to repeat code everywhere to put and reset styles, and it overrrides css styles.

With _className_ we can use conditional blocks or literal templates ([Javascript Refresher](Section_2_Javascript_Refresher.md))

```js
const CourseInput = props => {
    ...

    const classValid = "form-control " + (!isValid ? "invalid" : ""); 

    return (
        <form onSubmit={formSubmitHandler}>
        {<div className={classValid}>
```

```js
<div className={`form-control ${!isValid ? 'invalid' : ''}`}>
```

## Styled components

> npm install --save styled-components

React dependency. Create a new component using the specific method for that component _styled.button_.

Based in tag literal tempalte?  ([Javascript Refresher](Section_2_Javascript_Refresher.md))

```js
import styled from 'styled-components';

const Button = styled.button`
font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  &:focus {
    outline: none;
  }
`
```

All the relative css is copied inside backticks, removing _.button_ and curly braces for the root element, but in pseudo selectors styles or any other _.button_, _.button_ is replaced by _&_ and curly brackets remain.

But if we want to use additional classes like _invalid_, we have to pass them because the only one that is applied is the root one

```css
& input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }

  &.invalid input {
    background: #ffd7d7;
    border-color: red;
  }

  &.invalid label {
    color: red;
  }
```

```js
return (
    <form onSubmit={formSubmitHandler}>
      <FormControl className={!isValid && 'invalid'}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </FormControl>
      <Button type="submit">Add Goal</Button>
    </form>
  );
```

The automatic applied classes are with weird names because they are generated dynamiclly by the library, but the other ones no.

```html
<div class="sc-gsDKAQ epJtBR invalid"><label>Course Goal</label><input type="text"></div>
```

### Dynamic style inside styled component

We can use props to modify values inside 'styled css'

```js
<FormControl invalid={!isValid}>
```

```js
const FormControl = styled.div`
    ...

  & input {
    display: block;
    width: 100%;
    border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')};
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  &.invalid input {
    background: #ffd7d7;
    border-color: red;
  }

`;
```

Then _&.invalid input_ can be removed.

### Media queries inside styled component

Set values for diferent devices.

```css
@media (min-width: 768px){
      width:auto
  }
```

We don't need selectors because it is applied to the root class

```js
import styled from 'styled-components';

const Button = styled.button`
font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  @media (min-width: 768px){
      width:auto
  }

  &:focus {
    outline: none;
  }
`
```

## CSS Modules

It only works in projects cpnfigutred for that, because it needs code transformation, and projects with creat-react-app are configured.

<https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/>

We have to rename the css file and import it in a different way

> import styles from './Button.module.css';

And we have to pass the wnated class as prop

```js
const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
```

The created class name has the component name, css class name, and a hash.
> \<button type="submit" class="Button_button__HcB9l">Add Goal</button>

Warning. Some clases names can be invalid, then we can escape them as  

> \<div className={styles['form-control']}>

## Dynamic styles with CSS Modules

The same problem as we have seen, we have to add the aditional classes, and we can use the same solutions, becasuse css module are normal classes, but with a process that change the name to be componet dependent.

> \<div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>

## Media queries with CSS Modules

Normal media queries, with selector

```css
@media (min-width: 768px) {
  .button {
    width: auto;
  }
}
```
