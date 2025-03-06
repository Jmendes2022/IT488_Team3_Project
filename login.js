const enterEmailForm = document.getElementById("loginForm");
const enterCodeForm = document.getElementById("enterCodeform");
const displayCodeSuccess = document.getElementById("displayCodeSuccess");

const code = document.getElementById("code");

function GetRandomCode(event) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  console.log(code);

  let user = JSON.parse(localStorage.getItem("user"));

  user = { ...user, code: code };

  console.log(user);

  localStorage.setItem("user", JSON.stringify(user));
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
}

function VerifyCode(e) {
  e.preventDefault();

  const userInput = document.getElementById("input-code");
  let user = JSON.parse(localStorage.getItem("user"));

  if (userInput.value == user.code) {
    alert("success!");
    DisplayCodeSuccess();
  } else {
    alert("failed! :(");
  }
}

const userInputForm = document
  .getElementById("verify-code-form")
  .addEventListener("submit", (e) => VerifyCode(e));
