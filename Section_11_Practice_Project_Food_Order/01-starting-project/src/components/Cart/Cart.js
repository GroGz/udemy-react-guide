import React from "react";

const Cart = (props) => {
  const cartItems = (
    <u className={classes['cart-items]}']}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </u>
  );

  return (
    <div>git diff
      {cartitems}
      <div>
        <span>Total Amount</span>
        <span>12.50</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt]}"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );
};

export default CanvasTransform;
