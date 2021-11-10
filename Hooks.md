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