const doughnutChartContainer = document.getElementById(
  "doughnut-chart-container"
);
const ctx = document.getElementById("doughtnut-chart");
let expenseList = document.getElementById("expense-list");

const user = JSON.parse(localStorage.getItem("user"));

LoadCharts();

function LoadDoughnutChart() {
  if (!user.expenses || user.expenses.length == 0) {
    doughnutChartContainer.innerHTML = `
    <div class="w-100 m-auto d-flex flex-column gap-3">
      <h2>You have no expenses added. <br/> Click below to add some!</h2>
      <button type="button" class='btn homeBtn w-50 align-self-center'><a href="./expenses.html">Add Expense</a>
      </button>
    </div>`;
  }

  const expenses = user.expenses.map((x) => {
    return x.name;
  });

  const expenseAmounts = user.expenses.map((x) => {
    return x.amount;
  });

  const expenseTotal = user.expenses.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );

  const expensePercentages = expenseAmounts.map((x) => {
    return Math.round((x / expenseTotal) * 100);
  });

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: expenses,
      datasets: [
        {
          label: "Percentage",
          data: expensePercentages,
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Current Expenses",
        },
      },
    },
  });

  expenseList.innerHTML = `
  <div class="expense-list-container">
    <ul class="expense-ul m-auto pt-5 w-75" id="expense-ul"></ul>
  </div>
  `;

  let expenseUl = document.getElementById("expense-ul");

  let expenseUlHTML = user.expenses
    .map(
      (x) => `
    <li><strong><u>${x.name}</u></strong> - $${x.amount} of $${expenseTotal}</li>
  `
    )
    .join("");

  expenseUl.innerHTML = expenseUlHTML;
}

function LoadCharts() {
  LoadDoughnutChart();
}
