# Practice User Project

App to order food, with editable shopping cart

## Code

1. [Snapshots project](https://github.com/academind/react-complete-guide-code/tree/11-practice-food-order-app)

## Steps

(e) extra files

1. `Create Header`
   1. Layout/Header
      1. Header.module.css (e)
   2. . assets/meals.jpg (e)
2. `Add header cart button`
   1. Layout/HeaderCartButton
      1. HeaderCartButton.module.css (e)
   2. Cart/CartIcon (e)
   3. [Step 2](#Step-2)
3. `Meal summary and available meals`
   1. Meals/Meals
   2. AvailableMeals
      1. dummy-meals.js (e)
   3. Meals/MealsSummary (e)
      1. MealsSummary.module.css (e)
   4. [Step 3](#Step-3)
4. `Format Available meals`
   1. UI/Card
      1. Card.module.css (e)
   2. Meals/MealItem/MealItem
      1. MealItem.module.css (e)
   3. Show AvailableMeals with MealItem
   4. [Step 4](#Step-4)
5. `Add form button to add meal`
   1. Meals/MealItem/MealItemForm
      1. MealItemForm.module.css (e)
   2. UI/Input
      1. Input.module.css (e)
   3. [Step 5](#Step-5)
6. `Cart`
   1. Cart/Cart
   2. This element is rendered in a modal
7. `Add modal`
   1. Create a div to contain modal in _index.html_ __Portal__
      1. \<div id="overlays"></div>
   2. UI/Modal
      1. component BackDrop
      2. component Overlay
      3. Modal.module.css (e)
   3. Cart/Cart
      1. Replace wrapper _div_ by `Modal`
      2. Place Cart in another _component_
         1. App.js
      3. Cart.module.css (e)
      4. Portal to place the modal components
         1. ReactDOM.createPortal(\<Backdrop />, overlays )
      5. [Step 6](#Step-6)
8. `Functional Modal`
   1. _state_ at App to hide/show `Cart`
   2. `showModalHandler`function to `HeaderCartButton`
   3. `showModalHandler`function to
      1. `Backdrop`
      2. `Cart.Modal.button`
   4. Don't use `Context`becasue a modal can be used multiple times

### Step 2

![image](images/s11-Header.PNG)

### Step 3

![image](images/s11-summary.PNG)

### Step 4

![image](images/s11-AvailableMeals.PNG)

### Step 5

![image](images/s11-addMeal.PNG)

### Step 6

![image](images/s11-cart.PNG)
