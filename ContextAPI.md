# Context API

Sometimes we need to transport the same info by/to a lot of components.

```js
const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={props.onLogout}>Logout</Button>
    </Card>
  );
};
```

We have `onLogout` action on several places.

In the `MainHeader` we receive `onLogout` prop that will be used in a button some components down.

> App > MainHeader > Navigation > button

Now imagine a flow when we have to send some data from one tree branch to another, too much components passing the _props_

## Context

Start a new folder `store` at the same level than `components`

This is a _object_ tha contains a _component_, **it's not a component**.

```js
import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});
```

Contained object in that file will only be read when we don't use `Provider`, because the only way to change data context is by `Provider`. We can add to context props and functions.

`This element is used by IDE to show in autocomplete, then it is a good idea to add all the props and methods that we are going to use`

To get/set data, components must be wrapped by the component `AuthContext.Provider`

```js
//<React.Fragment>
<AuthContext.Provider>
  <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
  <main>
    {!isLoggedIn && <Login onLogin={loginHandler} />}
    {isLoggedIn && <Home onLogout={logoutHandler} />}
  </main>
</AuthContext.Provider>
//</React.Fragment>
```

We can remove `Fragment` because the _provider component_ this is a valid _wrapper_

## Listen by consumer

Wrapper surrounds the component where `Context` will be accesed, but the children components are sorrounded with an arrow function.

```js
 return (
    <AuthContext.Consumer>
      {(ctx) => {
            return (<ChildrenComponents />)
            }
      }
      </AuthContext.Consumer>
```

```js
const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return(
        <nav className={classes.nav}>
          <ul>
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {props.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button onClick={props.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>;)
      }}
    </AuthContext.Consumer>
  );
};
```

We are using a `Provider` and needs to pass the default context data from the tag, where `isLoggedIn` is a _state_ value

```js
return (
    //<React.Fragment>
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
      }}
    >
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
```

An we can remove `isAuthenticated` from other elements

> \<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />

## Listen with useContext Hook

`Consumer` works but there is a better solution, `useContext` hook.

```js
import React, { useContext } from "react";

const Navigation = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
```

## When use context instead of pass props

Most of the times _props_ is enough, we should use `Context` when props have to pass through a lot of components and the values are very specific. If we have a generic button, we don't want to limit clicks to logout

```js
<AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}
    >
```

This is not a generic button

```js
const Navigation = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        ...
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
```

But this is a generic button where _props_ apllies better

```js
const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={props.onLogout}>Logout</Button>
    </Card>
  );
};
```

## Creating a provider

Context it's not a _component, it's a object that contains a \_component `Provider`, and we can to create this \_component_. In fact, we are going to create a wrapper for that component, and export it not as default, as name.

```js
import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});

export const AuthContextProvider = (props) => {

  return (
    <AuthContext.Provider >props.children</AuthContext.Provider>
  );
};

export default AuthContext;
```

Now, we can embed here the login code, using hooks if necesary and wrapping all the components.

```js
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvider><App /></AuthContextProvider>,
  document.getElementById("root")
);
```

Login code now is in the 'AuthContextProvider`

```js
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  ...fake props...
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") { setIsLoggedIn(true);}
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{isLoggedIn: isLoggedIn,onLogout: logoutHandler,onLogin: loginHandler,}}
    >{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
```

All the children _components_ can access to context elements to use or to pass to other element as _prop_

```js
const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (<li> <a href="/">Users</a></li>)}
        {ctx.isLoggedIn && (<li><a href="/">Admin</a></li>)}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
```

```js
const Home = () => {

  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogout}>Logout</Button>
    </Card>
  );
};
```

## Limitations and use

* Context it's not optimized for high frequency changes
* Don't use with generic components
  