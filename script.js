// =========================
// Burger menu toggle
// =========================
const burger = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile_nav");
const navLinks = document.querySelectorAll(".mobile_nav a");

if (burger) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });
}

// Close menu when clicking on any nav link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    mobileNav.classList.remove("active");
  });
});

// =========================
// FAQ accordion
// =========================
document.querySelectorAll(".faq").forEach((faq) => {
  faq.addEventListener("click", () => {
    const content = faq.nextElementSibling;
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });
});

// =========================
// URL Shortener
// =========================
const form = document.querySelector(".shortener-form");
const input = form?.querySelector("input[type='url']");
const resultBox = document.querySelector(".shortener-result");
const shortLink = document.getElementById("short-link");
const copyBtn = document.getElementById("copy-btn");
const openBtn = document.getElementById("open-btn");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const longURL = input.value.trim();

    if (!longURL) return;

    try {
      // Call TinyURL API (can swap with your own backend later)
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`
      );
      const shortURL = await response.text();

      // Show result
      shortLink.href = shortURL;
      shortLink.textContent = shortURL;
      resultBox.style.display = "block";

    } catch (error) {
      alert("Error shortening URL. Please try again.");
    }
  });
}

// =========================
// Copy & Open Buttons
// =========================
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(shortLink.href).then(() => {
      copyBtn.innerHTML = "✔ Copied!";
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
      }, 2000);
    });
  });
}

if (openBtn) {
  openBtn.addEventListener("click", () => {
    if (shortLink.href) {
      window.open(shortLink.href, "_blank");
    }
  });
}