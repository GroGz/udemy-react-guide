import React, {useState} from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {

  const [showForm, setShowForm] = useState(false);

  const onSaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData);
    setShowForm(false);
  }

  const startEditingHandler = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  }
  
  let filterContent = <button type="submit" onClick={startEditingHandler}>Add New Expense</button>;

  if (showForm) {
    filterContent = (
      <ExpenseForm
        onSaveExpenseData={onSaveExpenseDataHandler}
        closeForm={startEditingHandler}
      />
    );
  }
    return (
      <div className="new-expense">
        {filterContent}
      </div>
    );
};

export default NewExpense;
