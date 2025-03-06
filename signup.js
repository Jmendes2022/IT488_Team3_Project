const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("Email");
const age = document.getElementById("Age");
const TermsandConditions = document.getElementById("TermsandConditions");

const codeConfirmationForm = document.getElementById("confirmCodeForm");
const codeInput = document.getElementById("confirm-code");

function GetRandomCode(event) {
  const newCode = Math.floor(100000 + Math.random() * 900000).toString();

  let user = JSON.parse(localStorage.getItem("user"));

  user = { ...user, code: newCode };

  localStorage.setItem("user", JSON.stringify(user));
}

function SaveToLocalStorage(data) {
  if (
    localStorage.getItem("user") &&
    localStorage.getItem("user") == email.value
  ) {
    return localStorage.getItem("user");
  } else {
    localStorage.setItem("user", JSON.stringify(data));
  }
}

function ClearForm() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  age.value = "";
  TermsandConditions.checked = false;
}

function VerifyCode(event) {
  event.preventDefault();

  let user = JSON.parse(localStorage.getItem("user"));

  if (user.code == codeInput.value) {
    user = {
      ...user,
      verified: true,
      DateLastLoggedIn: new Date(),
      loggedIn: true,
    };

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/index.html";
  } else {
    alert("invalid code!");
  }
}
