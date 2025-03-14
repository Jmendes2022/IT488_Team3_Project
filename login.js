const enterEmailForm = document.getElementById("loginForm");
const enterCodeForm = document.getElementById("enterCodeform");
const displayCodeSuccess = document.getElementById("displayCodeSuccess");

const code = document.getElementById("code");

function GetRandomCode() {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  console.log(code);

  let user = JSON.parse(localStorage.getItem("user"));

  user = { ...user, code: code };

  console.log(user);

  localStorage.setItem("user", JSON.stringify(user));
  return code;
}

function GetUserData() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user;
}

function DisplayEnterLoginCode() {
  enterEmailForm.classList.toggle("hidden");
  enterCodeForm.classList.toggle("hidden");
}

function DisplayCodeSuccess() {
  enterCodeForm.classList.toggle("hidden");
  displayCodeSuccess.classList.toggle("hidden");

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 2000);
}

function VerifyCode(e) {
  e.preventDefault();

  const userInput = document.getElementById("input-code");
  let user = JSON.parse(localStorage.getItem("user"));

  if (userInput.value == user.code) {
    console.log("success!");

    user = { ...user, loggedIn: true, DateLastLoggedIn: new Date() };
    localStorage.setItem("user", JSON.stringify(user));
    DisplayCodeSuccess();
  } else {
    alert("Incorrect code! Please try again!");
    userInput.value = "";
    console.log("Incorrect code");
  }
}

const userInputForm = document
  .getElementById("verify-code-form")
  .addEventListener("submit", (e) => VerifyCode(e));
