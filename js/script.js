// ---------------- MENU BUTTON TOGGLE ----------------
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Toggle between hamburger and close icon
    const icon = menuBtn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });
}


// ---------------- SMOOTH SCROLLING ----------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // adjust for header height
        behavior: "smooth"
      });
    }
  });
});

// ---------------- CONTACT FORM SAVE & DISPLAY ----------------
const contactForm = document.querySelector(".contact-form");
const contactContainer = document.querySelector("#contact .contact-container");

// Create a display area for saved messages
let messagesBox = document.createElement("div");
messagesBox.classList.add("messages-box");
contactContainer.appendChild(messagesBox);

// Load saved messages on page load
function loadMessages() {
  const saved = JSON.parse(localStorage.getItem("messages")) || [];
  messagesBox.innerHTML = "<h3>Saved Messages</h3>";
  saved.forEach((msg, index) => {
    messagesBox.innerHTML += `
      <div class="msg">
        <p><strong>${msg.name}</strong> (${msg.email})</p>
        <p>${msg.message}</p>
        <hr>
      </div>
    `;
  });
}
loadMessages();

// Save new message
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const message = contactForm.querySelector("textarea").value;

  if (name && email && message) {
    const saved = JSON.parse(localStorage.getItem("messages")) || [];
    saved.push({ name, email, message });
    localStorage.setItem("messages", JSON.stringify(saved));
    contactForm.reset();
    loadMessages();
    alert("✅ Message saved locally!");
  } else {
    alert("⚠️ Please fill all fields");
  }
});
