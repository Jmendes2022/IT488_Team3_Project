const expensesField = document.getElementById("expenses");

const newExpense = document.getElementById("added-expense");
const newExpenseAmount = document.getElementById("added-expense-amount");


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

    expensesField.innerHTML = "";

    const expensesHTML = expenses.map(x => `<input type='text' required placeholder='Expense Type' value=${x.name}/> </input> <input type='text' required placeholder='Expense Type' value=$${x.amount}/>`).join("");
    expensesField.innerHTML = expensesHTML;


}

function AddExpense(event) {
    event.preventDefault();

    let user = GetCurrentUser();
    
    let expenses = user.expenses || [];

    const expenseToAdd = {
        name: newExpense.value,
        amount: newExpenseAmount.value
    }

    expenses.push(expenseToAdd);
    user = {...user, expenses: expenses};

    newExpense.value = "";
    newExpenseAmount.value = "";

    SaveCurrentUser(user);
    GetCurrentExpenses();
}