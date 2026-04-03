window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.display = "none";
  }, 700);
});

const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const navAnchors = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navAnchors.forEach((link) => link.addEventListener("click", () => navLinks.classList.remove("open")));

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navAnchors.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    }
  });
}, { threshold: 0.45 });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("show"));
}, { threshold: 0.2 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.style.width = entry.target.style.getPropertyValue("--value");
  });
}, { threshold: 0.35 });
document.querySelectorAll(".progress div").forEach((bar) => skillObserver.observe(bar));

const typingText = document.getElementById("typingText");
const typingPhrases = ["Building intelligent systems with purpose.", "Turning ideas into clean, scalable code.", "Open to internships and collaboration."];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
function typeEffect() {
  const current = typingPhrases[phraseIndex];
  typingText.textContent = current.slice(0, charIndex);
  if (!isDeleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeEffect, 65);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 35);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    setTimeout(typeEffect, 900);
  }
}
typeEffect();

// Fake code editor typing animation in hero.
const codeTyping = document.getElementById("codeTyping");
const codeSnippet = [
  '<span class="code-com">// Aspiring Software Engineer Portfolio</span>',
  '<span class="code-key">const</span> <span class="code-fn">developer</span> = {',
  '  name: <span class="code-str">"Kashish Rajpal"</span>,',
  '  role: <span class="code-str">"AI & ML Student"</span>,',
  '  skills: [<span class="code-str">"Python"</span>, <span class="code-str">"Flask"</span>, <span class="code-str">"NLP"</span>],',
  '  goal: <span class="code-str">"Build impactful products"</span>',
  '};',
  '',
  '<span class="code-key">function</span> <span class="code-fn">buildFuture</span>() {',
  '  <span class="code-key">return</span> <span class="code-str">"Let\\\'s collaborate 🚀"</span>;',
  '}'
].join("\n");

let codeIndex = 0;
function typeCode() {
  if (!codeTyping) return;
  if (codeIndex <= codeSnippet.length) {
    codeTyping.innerHTML = codeSnippet.slice(0, codeIndex);
    codeIndex++;
    setTimeout(typeCode, 14);
  }
}
typeCode();

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 420 ? "grid" : "none";
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

form.addEventListener("submit", (event) => {
  
  const nameField = document.getElementById("fullName");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const fullName = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  [nameField, emailField, messageField].forEach((field) => field.classList.remove("invalid"));

  if (fullName.length < 2) {
    event.preventDefault();
    nameField.classList.add("invalid");
    formMessage.textContent = "Please enter a valid name.";
    formMessage.style.color = "#ff7b7b";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    event.preventDefault();
    emailField.classList.add("invalid");
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "#ff7b7b";
    return;
  }

  if (message.length < 10) {
    event.preventDefault();
    messageField.classList.add("invalid");
    formMessage.textContent = "Message should be at least 10 characters.";
    formMessage.style.color = "#ff7b7b";
    return;
  }

  // ✅ If everything is valid → DO NOT prevent default
  formMessage.textContent = "Sending message...";
  formMessage.style.color = "#7ff0c8";

});

document.getElementById("year").textContent = new Date().getFullYear();
