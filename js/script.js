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

// ------------------- ANIMATED SKILLS ------------------------
function animateSkills() {
  document.querySelectorAll(".circle").forEach(circle => {
    let percent = circle.getAttribute("data-percent");
    let number = circle.querySelector(".number");

    circle.style.setProperty("--percent", percent);

    // Animate number counting
    let count = 0;
    let interval = setInterval(() => {
      if (count >= percent) {
        clearInterval(interval);
      } else {
        count++;
        number.textContent = count + "%";
      }
    }, 20);
  });
}

// Trigger animation when skills section is visible
const skillsSection = document.querySelector("#skills");
let skillsAnimated = false;

window.addEventListener("scroll", () => {
  const sectionTop = skillsSection.offsetTop - 300;
  if (window.scrollY >= sectionTop && !skillsAnimated) {
    animateSkills();
    skillsAnimated = true;
  }
});

// ✅ EmailJS Contact Form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Replace these with your EmailJS details
    emailjs.init("j5Lvaxd1G84x4_avx"); // 🔑 From EmailJS dashboard

    emailjs.sendForm("service_5gm9x1w", "template_4e6x8yn", form)
      .then(function () {
        alert("✅ Message sent successfully!");
        form.reset();
      }, function (error) {
        alert("❌ Failed to send message. Please try again.\n" + JSON.stringify(error));
      });
  });
});