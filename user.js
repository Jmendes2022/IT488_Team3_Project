GetUserData();

function GetUserData() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user.DateLastLoggedIn) {
    user = { ...user, verified: false };
    alert("you have been logged out due to inactivity. Please log in again!");
    window.location.href = "/login.html";
  }

  const today = new Date();
  const DateLastLoggedIn = user.DateLastLoggedIn;
  const timeDifference = today - DateLastLoggedIn;
  const hoursElapsed = timeDifference / (1000 * 60 * 60);

  if (hoursElapsed >= 24) {
    user = { ...user, verified: false };
    alert("you have been logged out due to inactivity. Please log in again!");
    window.location.href = "/login.html";
  }
}
