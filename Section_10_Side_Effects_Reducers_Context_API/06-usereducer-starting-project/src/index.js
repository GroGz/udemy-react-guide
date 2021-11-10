import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AppOld from "./AppOld";
import { AuthContextProvider } from './store/auth-context';

//ReactDOM.render(<AppOld />, document.getElementById('root'));
ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
