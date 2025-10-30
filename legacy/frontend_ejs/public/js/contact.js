document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  hamburger.addEventListener("click", function () {
    nav.classList.toggle("active");
  });
    
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Your message has been sent!");
        form.reset();
    });
});
