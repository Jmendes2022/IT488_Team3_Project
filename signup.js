const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const age = document.getElementById("age");
const TermsandConditions = document.getElementById("TermsandConditions");

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

function ClearStorage() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  age.value = "";
  TermsandConditions.checked = false;
}
