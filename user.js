const loggedUser = document.getElementById("loggedUser");
const signIn = document.getElementById("signIn");

// LoadTestData();
GetUserData();

function LoadTestData() {
  const user = {
    firstName: "Jordan",
    lastName: "Mendes",
    age: "29",
    code: "150333",
    email: "Jordanm1996.jm@gmail.com",
    verified: true,
    loggedIn: true,
    DateLastLoggedIn: new Date().getHours(),
  };

  localStorage.setItem("user", JSON.stringify(user));
}

function GetUserData() {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  if (user && !user.DateLastLoggedIn) {
    user = { ...user, loggedIn: false };
    localStorage.setItem("user", JSON.stringify(user));
    console.log("logged in");
  }

  const now = new Date().getHours();
  const DateLastLoggedIn = user.DateLastLoggedIn;
  const timeDifference = now - DateLastLoggedIn;
  const hoursElapsed = parseInt(timeDifference);

  if (!hoursElapsed == 0 && user.loggedIn) {
    user = { ...user, loggedIn: false };
    localStorage.setItem("user", JSON.stringify(user));

    alert("you have been logged out due to inactivity. Please log in again!");
    window.location.href = "/login.html";
  }

  if (user && user.verified && user.loggedIn && hoursElapsed == 0) {
    loggedUser.innerHTML = `Hi, ${user.firstName}!`;
    loggedUser.classList.toggle("hidden");
    signIn.classList.toggle("hidden");
    console.log("logged in");
  }
}
