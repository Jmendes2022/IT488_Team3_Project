const loggedUser = document.getElementById("loggedUser");
const signIn = document.getElementById("signIn");
const logoutBtn = document.getElementById("logoutBtn");

const signupBtn = document.getElementById("signupBtn");
const expenseBtn = document.getElementById("expenseBtn");
const reportsBtn = document.getElementById("reportsBtn");

// LoadTestData();

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", UpdateLastActivity);
});

GetUserData();

setInterval(CheckRecentActivity, 5000);

// function LoadTestData() {
//   const user = {
//     firstName: "Jordan",
//     lastName: "Mendes",
//     age: "29",
//     code: "150333",
//     email: "Jordanm1996.jm@gmail.com",
//     verified: true,
//     loggedIn: true,
//     DateLastLoggedIn: new Date(),
//   };

//   localStorage.setItem("user", JSON.stringify(user));
// }

function GetUserData() {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  if (user && !user.DateLastLoggedIn) {
    user = { ...user, loggedIn: false };
    localStorage.setItem("user", JSON.stringify(user));
    console.log("logged in");
  }

  const hoursElapsed = GetElapsedHours();

  const inactive = CheckRecentActivity();

  if (!hoursElapsed == 0 && user.loggedIn) {
    InactivityLogout(user);
  }

  if (user && user.verified && user.loggedIn && hoursElapsed == 0) {
    const userFirstName = convertToSentenceCase(user.firstName);

    loggedUser.innerHTML = `Hi, ${userFirstName}!`;
    loggedUser.classList.toggle("hidden");
    signIn.classList.toggle("hidden");

    logoutBtn.classList.toggle("hidden");
    logoutBtn.addEventListener("click", () => logout());
    signupBtn.classList.toggle("hidden");
    expenseBtn.classList.toggle("hidden");
    reportsBtn.classList.toggle("hidden");
  }
}

function logout() {
  let user = JSON.parse(localStorage.getItem("user"));
  user = { ...user, loggedIn: false };
  localStorage.setItem("user", JSON.stringify(user));

  console.log("successfully logged out!");
  window.location.href = "/index.html";
}

function convertToSentenceCase(input) {
  if (input) {
    const result = input.charAt(0).toUpperCase() + input.slice(1);
    return result;
  }
}

function GetElapsedHours() {
  const user = JSON.parse(localStorage.getItem("user"));

  const now = new Date().getHours();
  const DateLastLoggedIn = new Date(user.DateLastLoggedIn).getHours();
  const timeDifference = now - DateLastLoggedIn;
  const hoursElapsed = parseInt(timeDifference);

  return hoursElapsed;
}

function UpdateLastActivity() {
  let user = JSON.parse(localStorage.getItem("user"));
  user = { ...user, lastActivity: Date.now() };

  localStorage.setItem("user", JSON.stringify(user));
  console.log("Activity updated!");
}

function CheckRecentActivity() {
  const inactivity_Limit = 60 * 60 * 1000;

  let user = JSON.parse(localStorage.getItem("user"));
  const lastActivity = user.lastActivity;

  if (lastActivity && user.loggedIn) {
    const timeDifference = Date.now() - parseInt(lastActivity, 10);

    if (timeDifference > inactivity_Limit) {
      InactivityLogout(user);
    }
  }

  console.log("activity checked...");
}

function InactivityLogout(user) {
  user = { ...user, loggedIn: false };
  localStorage.setItem("user", JSON.stringify(user));

  alert("you have been logged out due to inactivity. Please log in again!");

  window.location.href = "/login.html";
}
