const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("Email");
const age = document.getElementById("Age");
const TermsandConditions = document.getElementById("TermsandConditions");

const codeConfirmationForm = document.getElementById("confirm-code-form");
const codeInput = document.getElementById("confirm-code");

function GetRandomCode(event) {
  return Math.floor(100000 + Math.random() * 900000);
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

// this code below is not working properly - code not full verified and needs to be double checked!!

function VerifyCode(e) {
  e.preventDefault();

  codeConfirmationForm.addEventListener("submit", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.code == codeInput) {
      user = { ...user, verified: true };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Successfully Verified!");
    } else {
      alert("Invalid code!");
    }
  });
}
