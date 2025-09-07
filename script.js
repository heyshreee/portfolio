// Typed.js initialization
document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: [
      "Aspiring Cybersecurity Analyst",
      "Ethical Hacker in Training",
      "Linux & Networking Enthusiast",
      "CTF Player 🕵️‍♂️",
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
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
const sections = document.querySelectorAll("section");

function revealOnScroll() {
  const triggerBottom = (window.innerHeight / 5) * 4;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("visible", "section-animate");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
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
    "root@sriram:~$ Welcome to my portfolio",
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
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectContainer = document.querySelector("#projects .row");
  const projects = Array.from(document.querySelectorAll(".project-item"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove "active" class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      // Reorder projects: filtered first, then the rest
      const filtered = projects.filter(
        (p) => filter === "all" || p.getAttribute("data-category") === filter
      );
      const others = projects.filter(
        (p) => filter !== "all" && p.getAttribute("data-category") !== filter
      );

      // Clear container and append in new order
      projectContainer.innerHTML = "";
      [...filtered, ...others].forEach((p) => {
        projectContainer.appendChild(p);

        if (filtered.includes(p)) {
          p.classList.remove("faded");
        } else {
          p.classList.add("faded");
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const terminalContainer = document.getElementById("mini-terminal");
  const toggleBtn = document.getElementById("terminal-toggle");
  const terminalOutputMini = document.getElementById("terminal-output-mini");
  const terminalInputMini = document.getElementById("terminal-input-mini");

  // --- Toggle Open/Close ---
  toggleBtn.addEventListener("click", () => {
    terminalContainer.style.display =
      terminalContainer.style.display === "flex" ? "none" : "flex";
  });

  // --- Print helper ---
  function printToTerminal(text) {
    terminalOutputMini.textContent += text + "\n";
    terminalOutputMini.scrollTop = terminalOutputMini.scrollHeight;
  }

  // --- ASCII Banner ---
  const asciiBanner = `
   ____       _                 
  / ___|  ___| |_ _ __ ___  ___ 
  \\___ \\ / _ \\ __| '__/ _ \\/ _ \\
   ___) |  __/ |_| | |  __/  __/
  |____/ \\___|\\__|_|  \\___|\\___|

  Welcome to Sriram’s Mini Terminal
  Type 'help' to see available commands.
  `;

  printToTerminal(asciiBanner);

  // --- Command History ---
  let commandHistory = [];
  let historyIndex = -1;

  // --- Commands Logic ---
  function handleCommand(command) {
    if (command === "help") {
      printToTerminal(
        "Available commands: help, about, skills, date, whoami, social, matrix, clear"
      );
    } else if (command === "about") {
      printToTerminal("I am Sriram, Aspiring Cybersecurity Analyst 🚀");
    } else if (command === "skills") {
      printToTerminal("Python, Linux, Networking, Wireshark, Nmap, Burp Suite");
    } else if (command === "date") {
      printToTerminal(new Date().toString());
    } else if (command === "whoami") {
      printToTerminal("sriram (cybersecurity analyst in training)");
    } else if (command === "matrix") {
      printToTerminal("Wake up, Neo... 🟢");
    } else if (command === "social") {
      printToTerminal(
        "GitHub: github.com/sriram\nLinkedIn: linkedin.com/in/sriram"
      );
    } else if (command === "clear") {
      terminalOutputMini.textContent = "";
    } else if (
      command === "download resume" ||
      command === "resume" ||
      command === "cv"
    ) {
      printToTerminal("Preparing download... 📝");

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;

        // Build progress bar
        let bar =
          "[" +
          "#".repeat(progress / 10) +
          " ".repeat(10 - progress / 10) +
          "]";
        printToTerminal(`Downloading... ${bar} ${progress}%`);

        if (progress >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            printToTerminal(
              "curl sriram-portfolio/resume.pdf --output Sriram_Resume.pdf"
            );

            // Trigger actual download
            const link = document.createElement("a");
            link.href = "resume.pdf"; // Path to your resume file
            link.download = "Sriram_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            printToTerminal("Download complete ✅ (Sriram_Resume.pdf)");
          }, 1000);
        }
      }, 300); // speed of progress bar
    } else if (command) {
      printToTerminal("Command not found: " + command);
    }
  }

  // --- Input Handling ---
  terminalInputMini.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = terminalInputMini.value.trim();
      printToTerminal("root@sriram:~$ " + command);

      if (command) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        handleCommand(command);
      }

      terminalInputMini.value = "";
    } else if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInputMini.value = commandHistory[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInputMini.value = commandHistory[historyIndex];
      } else {
        terminalInputMini.value = "";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const activeVisitorsEl = document.getElementById("active-visitors");
  const totalVisitorsEl = document.getElementById("total-visitors");
  const lastVisitorEl = document.getElementById("last-visitor");

  // Fake visitor stats
  const activeVisitorsTarget = 18;
  const totalVisitorsTarget = 1245; // total visitors
  const fakeIPs = [
    "192.168.1.12",
    "10.0.0.45",
    "172.16.5.23",
    "203.0.113.9",
    "198.51.100.77",
  ];

  // Animate numbers
  function animateCount(el, target, duration = 2000) {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      el.textContent = start;
      if (start >= target) clearInterval(timer);
    }, stepTime);
  }

  animateCount(activeVisitorsEl, activeVisitorsTarget);
  animateCount(totalVisitorsEl, totalVisitorsTarget);

  // Typing effect for last visitor IP
  function typeText(el, text, speed = 120) {
    let idx = 0;
    el.textContent = "";
    const interval = setInterval(() => {
      el.textContent += text[idx];
      idx++;
      if (idx >= text.length) clearInterval(interval);
    }, speed);
  }

  const lastVisitorIP = fakeIPs[Math.floor(Math.random() * fakeIPs.length)];
  typeText(lastVisitorEl, lastVisitorIP);
});

document.addEventListener("DOMContentLoaded", () => {
  const skillProgress = document.querySelectorAll(".skill-progress");

  skillProgress.forEach(bar => {
    const value = bar.getAttribute("data-progress");
    bar.style.setProperty('--progress', value + '%');
  });
});


