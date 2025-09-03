// Typed.js initialization
document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: [
      "Aspiring Cybersecurity Analyst",
      "Ethical Hacker in Training",
      "Linux & Networking Enthusiast",
      "CTF Player 🕵️‍♂️"
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
});



// Matrix rain effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff99";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 33);



// Set current year in footer
const yearSpan = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Scroll reveal animations
const sections = document.querySelectorAll('section');

function revealOnScroll() {
  const triggerBottom = window.innerHeight / 5 * 4;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('visible', 'section-animate');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();







document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal-output");
  const intro = document.getElementById("terminal-intro");

  const lines = [
    "[ OK ] Starting system log daemon...",
    "[ OK ] Initializing network interfaces...",
    "[ OK ] Loading kernel modules...",
    "[ OK ] Starting ssh service...",
    "[ OK ] Mounting filesystems...",
    "[ OK ] Kali Linux Security Tools Loaded",
    "[ OK ] Access granted ✅ for user: sriram",
    "root@sriram:~$ Welcome to my portfolio"
  ];

  let lineIndex = 0;

  function finishIntro() {
    intro.classList.add("fade-out"); // Smooth exit
    setTimeout(() => {
      intro.style.display = "none";
      document.body.classList.remove("loading");
    }, 1000); // Match fade duration
  }

  function typeLine() {
    if (lineIndex < lines.length) {
      let line = lines[lineIndex];
      let charIndex = 0;
      let interval = setInterval(() => {
        terminal.textContent += line[charIndex];
        charIndex++;
        if (charIndex === line.length) {
          clearInterval(interval);
          terminal.textContent += "\n";
          lineIndex++;
          setTimeout(typeLine, 400);
        }
      }, 30);
    } else {
      // After all lines finish, show "Press Enter or Tap"
      setTimeout(() => {
        terminal.textContent += "\nPress [Enter] or Tap to continue...";
        enableSkip();
      }, 500);
    }
  }

  function enableSkip() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finishIntro();
    });
    document.addEventListener("click", finishIntro);
    document.addEventListener("touchstart", finishIntro);
  }

  typeLine();
});



