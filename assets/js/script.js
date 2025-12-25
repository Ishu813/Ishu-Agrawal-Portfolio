"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Store Contact Form Data in Local Storage
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const submitBtn = document.querySelector("[data-form-btn]");

/* Enable / Disable Send Button */
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    submitBtn.disabled = ![...formInputs].every((i) => i.value.trim() !== "");
  });
});

/* Handle Form Submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const response = {
    fullName: form.fullname.value,
    email: form.email.value,
    message: form.message.value,
    timestamp: new Date().toLocaleString(),
  };

  // Get existing responses or create new array
  const storedResponses =
    JSON.parse(localStorage.getItem("contactResponses")) || [];

  storedResponses.push(response);

  // Store in JSON format
  localStorage.setItem("contactResponses", JSON.stringify(storedResponses));

  alert("Message sent successfully 🚀");

  form.reset();
  submitBtn.disabled = true;
});

// ===============================
// ADMIN LOGIN & RESPONSE HANDLING
// ===============================

const adminLoginSection = document.querySelector("[data-admin-login]");
const adminResponsesSection = document.querySelector("[data-admin-responses]");
const adminLoginBtn = document.querySelector("#adminLoginBtn");
const adminPasswordInput = document.querySelector("[data-admin-password]");
const responsesContainer = document.querySelector("[data-responses-container]");

// Admin login
adminLoginBtn.addEventListener("click", () => {
  const password = adminPasswordInput.value.trim();

  if (password === "admin123") {
    // hide login section
    adminLoginSection.classList.add("hidden");
    adminLoginSection.classList.remove("active");

    // show responses section
    adminResponsesSection.classList.remove("hidden");
    adminResponsesSection.classList.add("active");

    loadAdminResponses();
  } else {
    alert("❌ Incorrect admin password");
  }
});

// Load responses dynamically
function loadAdminResponses() {
  const responses = JSON.parse(localStorage.getItem("contactResponses")) || [];

  responsesContainer.innerHTML = "";

  if (responses.length === 0) {
    responsesContainer.innerHTML = "<p>No responses received yet.</p>";
    return;
  }

  responses.forEach((res, index) => {
    const card = document.createElement("div");
    card.classList.add("response-card");

    card.innerHTML = `
      <p><strong>#${index + 1}</strong></p>
      <p><strong>Name:</strong> ${res.fullName}</p>
      <p><strong>Email:</strong> ${res.email}</p>
      <p><strong>Message:</strong> ${res.message}</p>
      <p><small>${res.timestamp}</small></p>
      <hr />
    `;

    responsesContainer.appendChild(card);
  });
}

// ===============================
// THEME TOGGLE
// ===============================

const themeToggleBtn = document.getElementById("themeToggle");

// default theme
document.body.classList.add("dark");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});
