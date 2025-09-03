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



document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove "active" class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      projects.forEach(project => {
        if (filter === "all" || project.getAttribute("data-category") === filter) {
          project.classList.remove("hide");
        } else {
          project.classList.add("hide");
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");
  const sendBtn = document.getElementById("chatbot-send");
  const input = document.getElementById("chatbot-text");
  const messages = document.getElementById("chatbot-messages");

  // Toggle chatbot window
  toggleBtn.addEventListener("click", () => {
    chatbotWindow.style.display =
      chatbotWindow.style.display === "flex" ? "none" : "flex";
  });

  // Send message
  function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    // User message
    const userMsg = document.createElement("div");
    userMsg.textContent = "🧑: " + text;
    messages.appendChild(userMsg);

    // Bot reply (simple)
    const botMsg = document.createElement("div");
    setTimeout(() => {
      botMsg.textContent = "🤖: " + getBotReply(text);
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 500);

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Simple bot replies
  function getBotReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! 👋 How can I help?";
    if (msg.includes("project")) return "Check out my GitHub projects in the Projects section.";
    if (msg.includes("contact")) return "You can reach me at sriram@example.com 📧";
    if (msg.includes("skills")) return "My key skills: Python, Linux, Wireshark, Nmap, Burp Suite 🛠️";
    return "I’m still learning 🧑‍💻, but you can check the sections above for more info!";
  }
});


