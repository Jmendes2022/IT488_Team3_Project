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

    const expenses = [...user.expenses];

    expenses.map(exp => expensesField.innerHTML = "<h1>Hello!</h1>");
}

function AddExpense(event) {
    event.preventDefault();

    let user = GetCurrentUser();
    console.log(`${newExpense.value} - ${newExpenseAmount.value}`);
    
    let expenses = [user.expenses] || [];

    const expenseToAdd = {
        name: newExpense.value,
        amount: newExpenseAmount.value
    }

    expenses.push(expenseToAdd);
    

    user = {...user, expenses: {...expenses}};


    SaveCurrentUser(user);
}