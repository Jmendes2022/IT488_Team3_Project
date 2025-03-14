const expensesTable = document.getElementById("expenses");

const newExpense = document.getElementById("added-expense");
const newExpenseAmount = document.getElementById("added-expense-amount");

GetCurrentExpenses();

function GetCurrentUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
}

function SaveCurrentUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function GetCurrentExpenses() {
  const user = GetCurrentUser();

  const expenses = user.expenses || [];

  if (expenses.length > 0) {
    expensesTable.innerHTML = `<table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Item</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody id="expensesTable">
  </tbody>
</table>`;

    const expensesFields = document.querySelector("#expensesTable");

    const expensesHTML = expenses.map(
      (x) => `
    <tr>
      <th scope="row"></th>
      <td>${x.name}</td>
      <td>${x.amount}</td>
    </tr>`
    );

    expensesFields.innerHTML = expensesHTML;
  }
}

function AddExpense(event) {
  event.preventDefault();

  let user = GetCurrentUser();

  let expenses = user.expenses || [];

  const expenseToAdd = {
    name: newExpense.value,
    amount: newExpenseAmount.value,
  };

  expenses.push(expenseToAdd);
  user = { ...user, expenses: expenses };

  newExpense.value = "";
  newExpenseAmount.value = "";

  SaveCurrentUser(user);
  GetCurrentExpenses();
}
