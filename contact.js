const contactForm = document.getElementById("contact-form");
const messageSent = document.getElementById("message-sent");

messageSent.classList.add("hidden");
contactForm.classList.remove("hidden");


function SendMessage(event)    {
    
    event.preventDefault();

    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    
    console.log(user + email + message);

    contactForm.classList.add("hidden");
    messageSent.classList.remove("hidden");
}

function ReturnHome() {
    window.location.href = "/index.html";
}

