const expensesTable = document.getElementById("expenses");

const newExpense = document.getElementById("added-expense");
const newExpenseAmount = document.getElementById("added-expense-amount");

//modal fields below
const modalTitle = document.querySelector("#exampleModalLabel");
const modalExpenseName = document.querySelector("#modal-expense-name");
const modalExpenseAmount = document.querySelector("#modal-expense-amount");
const modalExpenseKey = document.querySelector("#modal-expense-key");

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
      <th scope="col">Expense No.</th>
      <th scope="col">Item</th>
      <th scope="col">Amount</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody id="expensesTable">
  </tbody>
</table>`;

    const expensesFields = document.querySelector("#expensesTable");

    const expensesHTML = expenses.map(
      (x, key) => `
    <tr>
        <td scope="row">${key + 1}</td>
        <td>${x.name}</td>
        <td>${x.amount}</td>
        <td>
            <div class="edit-expense" data-key="${key}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </div>
        </td>
        <td>
            <div class="delete-expense" id="delete-expense">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </div>
        </td>
    </tr>`
    );

    expensesFields.addEventListener("click", function (event) {
      if (event.target.closest(".edit-expense")) {
        const key = event.target.closest(".edit-expense").dataset.key;
        EditExpense(parseInt(key));
      }
    });

    expensesFields.innerHTML = expensesHTML.join("");
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

function EditExpense(expense) {
  let expenses = JSON.parse(localStorage.getItem("user")).expenses;

  let foundExpense = expenses[expense];
  modalExpenseName.value = foundExpense.name;
  modalExpenseAmount.value = foundExpense.amount;
  modalExpenseKey.innerHTML = expense;
  modalTitle.innerHTML = `Editing Expense - ${expense + 1}`;
}

function SaveEditedExpenses() {
  //   event.preventDefault();

  let expenses = JSON.parse(localStorage.getItem("user")).expenses;
  const expense = parseInt(modalExpenseKey.innerHTML, 10);
  let foundExpense = expenses[expense];

  foundExpense.name = modalExpenseName.value;
  foundExpense.amount = modalExpenseAmount.value;

  const updatedExpenses = expenses.map((x, index) => {
    return index == expense ? foundExpense : x;
  });

  let user = GetCurrentUser();
  user.expenses = updatedExpenses;
  SaveCurrentUser(user);
  GetCurrentExpenses();
}
