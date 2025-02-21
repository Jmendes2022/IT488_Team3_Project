const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("Email");
const age = document.getElementById("Age");
const TermsandConditions = document.getElementById("TermsandConditions");

const codeConfirmationForm = document.getElementById("confirmCodeForm");
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

function VerifyCode(event) {
  event.preventDefault();
  console.log("test confirm code");
  alert("confirm code hit!");

  let user = JSON.parse(localStorage.getItem("user"));

  if (user.code == codeInput.value) {
    user = { ...user, verified: true, DateLastLoggedIn: new Date() };
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    alert("invalid code!");
  }

  // const currDate = new Date();
  // undefined
  // let futureDate = new Date();
  // futureDate.setDate(futureDate.getDate() + 3);

  // const timeDiff = futureDate - currDate;

  // const hrsDiff = timeDiff / (1000 * 60 * 60);

  // console.log(hrsDiff);

  // });
}
