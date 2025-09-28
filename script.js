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
revealOnScroll(); // Initial check

// Project filtering logic
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectContainer = document.querySelector("#projects .row");
  const projects = Array.from(document.querySelectorAll(".project-item"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      const filtered = projects.filter(
        (p) => filter === "all" || p.getAttribute("data-category") === filter
      );
      const others = projects.filter(
        (p) => filter !== "all" && p.getAttribute("data-category") !== filter
      );

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

// Visitor stats animation
document.addEventListener("DOMContentLoaded", () => {
  const activeVisitorsEl = document.getElementById("active-visitors");
  const totalVisitorsEl = document.getElementById("total-visitors");
  const lastVisitorEl = document.getElementById("last-visitor");

  const activeVisitorsTarget = 18;
  const totalVisitorsTarget = 1245;
  const fakeIPs = [
    "192.168.1.12",
    "10.0.0.45",
    "172.16.5.23",
    "203.0.113.9",
    "198.51.100.77",
  ];

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

// Skills bar animation
document.addEventListener("DOMContentLoaded", () => {
  const skillProgress = document.querySelectorAll(".skill-progress");

  skillProgress.forEach((bar) => {
    const value = bar.getAttribute("data-progress");
    bar.style.setProperty("--progress", value + "%");
  });
});

// Three.js background animation
window.onload = function () {
  let scene, camera, renderer, particleSystem;
  let mouseX = 0,
    mouseY = 0;

  const container = document.getElementById("scene-container");
  if (!container) {
    console.error("Scene container not found!");
    return;
  }

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const particleCount = 10000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() * 2 - 1) * 500;
      positions[i + 1] = (Math.random() * 2 - 1) * 500;
      positions[i + 2] = (Math.random() * 2 - 1) * 500;
      color.setHSL(i / (particleCount * 3), 1.0, 0.5);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true,
    });

    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 10;
    mouseY = (event.clientY - window.innerHeight / 2) / 10;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // NEW: Function to handle scroll-based animation
  function onScroll() {
    if (particleSystem) {
      // Rotate the particle system based on the scroll position
      const scrollY = window.scrollY;
      particleSystem.rotation.x = scrollY * 0.0003;
      particleSystem.rotation.z = scrollY * 0.0001;
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    particleSystem.rotation.y = time * 5; // Continuous rotation

    renderer.render(scene, camera);
  }

  // Add event listeners
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("scroll", onScroll, false); // NEW: Listen for scroll events

  init();
  animate();
};

