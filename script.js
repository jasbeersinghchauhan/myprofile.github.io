(function () {
  "use strict";

  /* ---------- CONFIG & STATE ---------- */
  const STATE = {
    startTime: getSystemStartTime(),
  };

  const CONFIG = {
    bootLogs: [
      ["SYS", "Initializing Kernel Modules..."],
      ["NET", "Mapping Network Topology"],
      ["AUTH", "Identity Verified"],
      ["SEC", "Applying Security Policies"],
      ["DB", "Cache Layer Connected"],
      ["SUCCESS", "System Online"],
    ],
    projects: [
      {
        title: "Secure Real-Time Messaging API",
        status: "Deployment Ready",
        link: "#",
        desc: "Distributed WebSocket architecture with End-to-End Encryption (E2EE).",
        stack: ["Node.js", "Redis Pub/Sub", "JWT"],
        hasCode: true,
      },
      {
        title: "Multithreaded Web Proxy",
        status: "Refactored v2",
        link: "https://github.com/jasbeersinghchauhan/Proxy_Web_Server.git",
        desc: "Originally built in C (WinAPI/Winsock), remade in C++20 using RAII, Smart Pointers, and std::thread. Features O(1) LRU Caching and Semaphore throttling.",
        stack: ["C++20 (RAII)", "Winsock2", "Smart Pointers"],
        hasCode: true,
      },
      {
        title: "Library Management System",
        status: "v1.0.0",
        link: "#",
        desc: "ACID-compliant backend system with transactional integrity.",
        stack: ["C++", "MySQL", "System Design"],
        hasCode: false,
      },
    ],
    codeSnippets: {
      "Multithreaded Web Proxy":
        "// EVOLUTION SUMMARY\n" +
        "// v1 (Legacy C): Manual memory management, raw WinAPI threads.\n" +
        "// v2 (Current C++): Refactored for safety and modern standards.\n\n" +
        "// ARCHITECTURE\n" +
        "// 1. Concurrency: Thread-per-client model using std::thread.\n" +
        "// 2. Synchronization: std::counting_semaphore for connection throttling.\n" +
        "// 3. Caching: Custom Thread-Safe LRU Cache (HashMap + Doubly Linked List).\n" +
        "// 4. RAII: Unique_ptrs allow automatic resource cleanup (Sockets/Handles).",
      "Secure Real-Time Messaging API":
        "// ARCHITECTURE SUMMARY\n" +
        "// 1. Scaling: Redis Adapter for horizontal scaling across nodes.\n" +
        "// 2. Auth: JWT handshake verification during WebSocket upgrade.\n" +
        "// 3. Security: Payloads encrypted before transmission.",
    },
  };

  /* ---------- SAFE HELPERS ---------- */

  const qs = (sel, parent = document) => parent.querySelector(sel);
  const qsa = (sel, parent = document) => [...parent.querySelectorAll(sel)];

  const createElement = (tag, className, text = "") => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };

  function nowUTC() {
    return new Date().toISOString().slice(11, 19);
  }

  function getSystemStartTime() {
    const stored = sessionStorage.getItem("sys_start_time");
    if (stored) return Number(stored);
    const now = Date.now();
    sessionStorage.setItem("sys_start_time", String(now));
    return now;
  }

  function pad(n) {
    return String(Math.floor(n)).padStart(2, "0");
  }

  /* ---------- INIT ---------- */

  const init = () => {
    initTerminal();
    initCommandPalette();
    initCopyLogic();
    renderProjects();
    initNetworkBackground();
    initSystemClock();
    initModalLogic();
  };

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);

  /* ---------- TERMINAL ---------- */

  // Add history state
  Object.assign(STATE, {
    cmdHistory: [],
    historyIndex: -1,
  });

  const FILE_SYSTEM = {
    "about.txt":
      "I am a 3rd-year CSE student specializing in Backend Engineering (Node.js/C++).",
    "skills.json": '["Node.js", "C++", "Redis", "MongoDB", "System Design"]',
    "contact.txt":
      "Email: jasbeersinghchauhan377@gmail.com\nGitHub: github.com/jasbeersinghchauhan",
    "secret.log": "ACCESS DENIED. Level 5 clearance required.",
  };

  function initTerminal() {
    const body = qs(".terminal-body");
    if (!body) return;

    let i = 0;

    // Helper to print lines
    const pushLog = (type, msg, className = "") => {
      const row = createElement("div", `log-line ${className}`);

      // Formatting based on type
      if (type === "CMD") {
        const prompt = createElement("span", "log-prompt", "visitor@root:~$ ");
        const cmdText = createElement("span", "log-cmd", msg);
        row.append(prompt, cmdText);
      } else {
        // Timestamp only for non-command logs
        if (type !== "OUTPUT") {
          const timeSpan = createElement("span", "log-time", nowUTC());
          row.appendChild(timeSpan);
        }

        // Optional type tag
        if (type && type !== "OUTPUT") {
          const typeSpan = createElement("span", "log-type", `[${type}]`);
          row.appendChild(typeSpan);
        }

        const msgSpan = createElement("span", "log-msg", msg);
        // Allow HTML for links/colors in OUTPUT
        if (type === "OUTPUT") msgSpan.innerHTML = msg;
        row.appendChild(msgSpan);
      }

      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
    };

    // 1. BOOT SEQUENCE
    const bootNext = () => {
      if (i >= CONFIG.bootLogs.length) {
        pushLog("SYS", "Shell initialization complete...");
        enableInteractiveShell(body, pushLog);
        return;
      }
      pushLog(CONFIG.bootLogs[i][0], CONFIG.bootLogs[i][1]);
      i++;
      setTimeout(bootNext, 400);
    };

    bootNext();
  }

  function enableInteractiveShell(terminalBody, printFn) {
    const inputRow = createElement("div", "input-line");

    inputRow.className = "input-line flex-center-start";

    const prompt = createElement("span", "prompt", "visitor@root:~$ ");
    prompt.className = "prompt-text";

    const input = createElement("input", "cmd-input");
    input.type = "text";
    input.autocomplete = "off";

    inputRow.append(prompt, input);
    terminalBody.appendChild(inputRow);

    // Focus handling
    terminalBody.addEventListener("click", () => input.focus());
    input.focus();

    // Command Logic
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = input.value.trim();
        input.value = "";

        inputRow.remove();
        printFn("CMD", cmd);

        if (cmd) {
          STATE.cmdHistory.push(cmd);
          STATE.historyIndex = STATE.cmdHistory.length;
          processCommand(cmd, printFn);
        }

        terminalBody.appendChild(inputRow);
        input.focus();
        terminalBody.scrollTop = terminalBody.scrollHeight;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (STATE.historyIndex > 0) {
          STATE.historyIndex--;
          input.value = STATE.cmdHistory[STATE.historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (STATE.historyIndex < STATE.cmdHistory.length - 1) {
          STATE.historyIndex++;
          input.value = STATE.cmdHistory[STATE.historyIndex];
        } else {
          STATE.historyIndex = STATE.cmdHistory.length;
          input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const validCmds = ["help", "ls", "clear", "about", "projects", "cat"];
        const current = input.value;
        const match = validCmds.find((c) => c.startsWith(current));
        if (match) input.value = match;
      }
    });
  }

  function processCommand(rawCmd, print) {
    const args = rawCmd.split(" ");
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case "help":
        print("OUTPUT", "Available commands:");
        print(
          "OUTPUT",
          "&nbsp;&nbsp;ls&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List directory contents"
        );
        print("OUTPUT", "&nbsp;&nbsp;cat [file] - Display file content");
        print(
          "OUTPUT",
          "&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal screen"
        );
        print(
          "OUTPUT",
          "&nbsp;&nbsp;whoami&nbsp;&nbsp;&nbsp;&nbsp;- Current user session"
        );
        print("OUTPUT", "&nbsp;&nbsp;projects&nbsp;&nbsp;- View project stack");
        break;

      case "ls":
      case "dir":
        const files = Object.keys(FILE_SYSTEM)
          .map((f) => `<span style="color: #F28C28;">${f}</span>`)
          .join("&nbsp;&nbsp;");
        print("OUTPUT", files);
        break;

      case "cat":
        if (!args[1]) {
          print("OUTPUT", "Usage: cat [filename]");
        } else if (FILE_SYSTEM[args[1]]) {
          print("OUTPUT", FILE_SYSTEM[args[1]]);
        } else {
          print("OUTPUT", `cat: ${args[1]}: No such file or directory`);
        }
        break;

      case "clear":
      case "cls":
        const body = qs(".terminal-body");
        qsa(".log-line", body).forEach((el) => el.remove());
        break;

      case "whoami":
        print("OUTPUT", "visitor@graphic-era-hill-university");
        break;

      case "projects":
        print("OUTPUT", "Redirecting to /projects...");
        setTimeout(() => (window.location.href = "projectPage.html"), 800);
        break;

      case "sudo":
        print(
          "OUTPUT",
          "user is not in the sudoers file. This incident will be reported."
        );
        break;

      default:
        print(
          "OUTPUT",
          `Command not found: ${cmd}. Type 'help' for available commands.`
        );
    }
  }

  /* ---------- COMMAND PALETTE ---------- */

  function initCommandPalette() {
    if (qs("#cmd-palette")) return;

    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div id="cmd-palette" class="cmd-overlay hidden">
        <div class="cmd-box">
          <div class="cmd-header">
            <span class="text-muted">>_ Navigation</span>
            <span class="badge">ESC</span>
          </div>
          <input id="cmd-search" placeholder="Type a command..." />
          <div class="cmd-list">
            <div class="cmd-item" data-cmd="/help"><span>/help</span><span class="text-muted">Commands</span></div>
            <a href="index.html" class="cmd-item"><span>/home</span></a>
            <a href="projectPage.html" class="cmd-item"><span>/projects</span></a>
            <a href="contactPage.html" class="cmd-item"><span>/contact</span></a>
            <a href="https://github.com/jasbeersinghchauhan" target="_blank" class="cmd-item"><span>/github</span></a>
            <a href="https://linkedin.com/in/jasbeer-singh-chauhan" target="_blank" class="cmd-item"><span>/linkedin</span></a>
          </div>
        </div>
      </div>`
    );

    const overlay = qs("#cmd-palette");
    const input = qs("#cmd-search");
    const items = qsa(".cmd-item");

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        overlay.classList.remove("hidden");
        input?.focus();
      }
      if (e.key === "Escape") overlay.classList.add("hidden");
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.add("hidden");
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.dataset.cmd === "/help") {
          alert("/home\n/projects\n/contact\n/github\n/linkedin\n\nCtrl + K");
        }
      });
    });
  }

  /* ---------- PROJECTS & MODAL LOGIC ---------- */

  function renderProjects() {
    const grid = qs(".project-grid");
    if (!grid) return;

    grid.replaceChildren();

    CONFIG.projects.forEach((p) => {
      const inspectBtnHtml = p.hasCode
        ? `<button class="repo-link" data-action="inspect" data-title="${p.title}">Inspect Logic</button>`
        : "";

      const stackHtml = p.stack
        .map((s) => `<span class="badge">${s}</span>`)
        .join("");

      const cardHTML = `
        <div class="card-header">
          <h3>${p.title}</h3>
          <span class="badge">${p.status}</span>
        </div>
        <p class="text-muted" style="margin-bottom: 1rem;">${p.desc}</p>
        <div class="card-footer">
            <div class="card-actions" style="display: flex; gap: 10px;">
              ${inspectBtnHtml}
              <a href="${p.link}" class="repo-link" target="_blank">Source Code ↗</a>
            </div>
            <div class="stack-list">${stackHtml}</div>
        </div>
      `;

      const article = createElement("article", "card");
      article.innerHTML = cardHTML;
      grid.appendChild(article);
    });
  }

  function initModalLogic() {
    const modal = qs("#code-modal");
    const grid = qs(".project-grid"); // We use delegation on the grid
    const titleEl = qs("#modal-title");
    const codeEl = qs("#modal-code");

    if (!modal || !grid) return;

    // Delegation: Listen for clicks on the grid, detect inspect buttons
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest('button[data-action="inspect"]');
      if (!btn) return;

      const title = btn.dataset.title;
      const snippet = CONFIG.codeSnippets[title] || "Source unavailable";

      titleEl.textContent = title.replace(/ /g, "_").toLowerCase() + ".cpp";
      codeEl.textContent = snippet;
      modal.style.display = "flex";
    });

    // Close Modal Logic
    document.addEventListener("click", (e) => {
      if (e.target.id === "code-modal" || e.target.id === "close-modal") {
        modal.style.display = "none";
      }
    });
  }

  /* ---------- COPY ---------- */

  function initCopyLogic() {
    const btn = qs("#copyBtn");
    if (!btn || !navigator.clipboard) return;

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("jasbeersinghchauhan377@gmail.com");
        const originalText = btn.textContent;
        btn.textContent = "✓ Copied";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1500);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    });
  }

  /* ---------- BACKGROUND ---------- */

  function initNetworkBackground() {
    const canvas = document.getElementById("network-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    const config = {
      particleColor: "rgba(88, 166, 255, 0.7)",
      lineColor: "rgba(88, 166, 255, 0.15)", // Base opacity for calculation
      particleAmount: 60,
      defaultSpeed: 0.8,
      linkRadius: 160,
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.defaultSpeed;
        this.vy = (Math.random() - 0.5) * config.defaultSpeed;
        this.size = 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.fill();
      }
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const linkParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.linkRadius) {
            const opacity = 1 - distance / config.linkRadius;
            ctx.strokeStyle = `rgba(88, 166, 255, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      linkParticles();
      requestAnimationFrame(loop);
    };

    const spawnParticles = () => {
      particles = [];
      for (let i = 0; i < config.particleAmount; i++) {
        particles.push(new Particle());
      }
    };

    window.addEventListener("resize", () => {
      resize();
      spawnParticles();
    });

    resize();
    spawnParticles();
    loop();
  }

  /* ---------- CLOCK ---------- */

  function initSystemClock() {
    const timeEl = qs("#utc-time");
    const uptimeEl = qs("#uptime-counter");
    if (!timeEl || !uptimeEl) return;

    setInterval(() => {
      timeEl.textContent = `UTC: ${nowUTC()}`;

      const diff = Date.now() - STATE.startTime;
      const hours = pad(diff / 3600000);
      const mins = pad((diff / 60000) % 60);
      const secs = pad((diff / 1000) % 60);

      uptimeEl.textContent = `UP: ${hours}:${mins}:${secs}`;
    }, 1000);
  }
})();
