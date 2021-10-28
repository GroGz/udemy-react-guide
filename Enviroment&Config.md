# Preparing development enviroment

## Node.js

React doesn't need node.js to be executed because it's executed at browsers, but we have some configurations and tools for development that needs node.js

create-react-app+ is a development tool used to to create a development preview server, transformation and optimizations for production deployment and needs node to to initialize

<https://github.com/facebook/create-react-app+>

* npx create-react-app my-app
* npm init react-app my-app
* yarn create react-app my-app

Then

> npm start

and app will be working at

> localhost:3000

If we are importing the project, and code exists

> npm install

## Project structure

```text
│   package.json
│
├───public
│       favicon.ico
│       index.html
│       logo192.png
│       logo512.png
│       manifest.json
│       robots.txt
│
└───src
        App.js
        index.css
        index.js
```

## Files

### package.json

Project configuration and dependencies

* Dependecies
  * react
  * react-dom

### index.js

Entry point for project

This code is translated by the development server in something that works with real js, like the CSS import.

```js
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

> ReactDOM.render(\<App />, document.getElementById('root'));

Replace _root_ element in index.html with our first component _App_ from App.js
> \<div id="root"></div>

### App.js

First component, coded with JSX, a mix between js and HTML.

```js
function App() {
  return (
    <div>
      <h2>Let's get started!</h2>
    </div>
  );
}
export default App;
```
