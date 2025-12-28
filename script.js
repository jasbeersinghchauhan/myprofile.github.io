/* =========================================
   SYSTEM CORE LOGIC (script.js)
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initTerminal();
  initCommandPalette();
  initCopyLogic();
  renderProjects();
  initNetworkBackground();
  initSystemClock();
});

/* --- 1. INTERACTIVE TERMINAL (Home Page) --- */
function initTerminal() {
  const termBody = document.querySelector(".terminal-body");
  if (!termBody) return;

  const logs = [
    { time: "00:00:01", type: "SYS", msg: "Initializing Kernel Modules..." },
    { time: "00:00:02", type: "NET", msg: "Mapping Network Topology [Ready]" },
    {
      time: "00:00:03",
      type: "AUTH",
      msg: "Identity Verified: Jasbeer S. Chauhan",
    },
    {
      time: "00:00:04",
      type: "SEC",
      msg: "Applying WebSocket JWT Middleware...",
    },
    {
      time: "00:00:05",
      type: "DB",
      msg: "Redis Cluster Connected on Port 6379",
    },
    {
      time: "00:00:06",
      type: "SUCCESS",
      msg: "Gateway Online. Port 443 Listening.",
    },
  ];

  let delay = 0;
  logs.forEach((log) => {
    setTimeout(() => {
      const row = document.createElement("div");
      row.className = "log-line";
      row.style.borderLeft =
        log.type === "SUCCESS"
          ? "2px solid var(--accent-secondary)"
          : "2px solid transparent";
      row.style.paddingLeft = "8px";

      row.innerHTML = `
                <span class="log-time" style="opacity:0.5">${log.time}</span>
                <span style="color:var(--accent-info); font-weight:bold; margin-right:8px;">[${log.type}]</span>
                <span>${log.msg}</span>
            `;
      termBody.appendChild(row);
      termBody.scrollTop = termBody.scrollHeight;
    }, delay);
    delay += 600;
  });
}

/* --- 2. COMMAND PALETTE (Ctrl + K) --- */
function initCommandPalette() {
  const modalHtml = `
    <div id="cmd-palette" class="cmd-overlay" style="display:none;">
        <div class="cmd-box">
            <div class="cmd-header">
                <span class="text-muted">>_ System Navigation</span>
                <span class="badge">ESC to close</span>
            </div>
            <input type="text" id="cmd-search" placeholder="Type a destination...">
            <div class="cmd-list">
                <a href="index.html" class="cmd-item"><span>/home</span><span class="text-muted">Return to base</span></a>
                <a href="https://github.com/jasbeersinghchauhan" target="_blank" class="cmd-item"><span>/github</span><span class="text-muted">Source Repositories</span></a>
                <a href="https://linkedin.com/in/jasbeer-singh-chauhan" target="_blank" class="cmd-item"><span>/linkedin</span><span class="text-muted">Professional Network</span></a>
                <a href="https://leetcode.com/u/jasbeersinghchauhan/" target="_blank" class="cmd-item"><span>/leetcode</span><span class="text-muted">Algorithm Stats</span></a>
                <a href="contactPage.html" class="cmd-item"><span>/contact</span><span class="text-muted">Send Handshake</span></a>
            </div>
        </div>
    </div>
`;
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const overlay = document.getElementById("cmd-palette");
  const input = document.getElementById("cmd-search");

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      overlay.style.display = "flex";
      input.focus();
    }
    if (e.key === "Escape") overlay.style.display = "none";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  });
}

/* --- 3. DYNAMIC PROJECTS --- */
function renderProjects() {
  const grid = document.querySelector(".project-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const projects = [
    {
      title: "Secure Real-Time Messaging API",
      status: "Deployment Ready",
      link: "#",
      desc: "Scalable WebSocket architecture solving the C10k problem. Features E2EE and distributed state management.",
      note: "Horizontal scaling achieved via Redis Pub/Sub integration.",
      stack: ["Node.js", "Socket.io", "Redis", "JWT"],
      hasCode: true,
    },
    {
      title: "Multithreaded Proxy Server",
      status: "Completed",
      link: "https://github.com/jasbeersinghchauhan/Proxy_Web_Server.git",
      desc: "High-performance proxy with LRU Cache. Migrated from C (WinAPI) to Modern C++20.",
      note: "Reduced latency by 40% via LRU Cache implementation.",
      stack: ["C++20", "Winsock2", "Semaphores"],
      hasCode: true,
    },
    {
      title: "Library Management System",
      status: "v1.0.0",
      link: "#",
      desc: "Backend asset management handling complex SQL relationships and ACID compliance.",
      stack: ["C++", "MySQL", "OOP"],
      hasCode: false,
    },
  ];

  projects.forEach((p) => {
    const inspectBtn = p.hasCode
      ? `<button onclick="openCodeModal('${p.title}')" class="repo-link" style="cursor:pointer; background:transparent; border:1px solid var(--accent-info); color:var(--accent-info);">
                 <span>{} Inspect Logic</span>
               </button>`
      : "";

    const card = `
            <article class="card">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${p.title}</h3>
                        <span class="text-accent" style="font-size: 0.8rem;">${p.status
      }</span>
                    </div>
                    <div style="display:flex; gap:10px;">
                        ${inspectBtn}
                        <a href="${p.link
      }" class="repo-link"><span>Source ↗</span></a>
                    </div>
                </div>
                <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1rem;">${p.desc
      }</p>
                ${p.note
        ? `<div style="background:rgba(0,0,0,0.3); padding:0.8rem; border-left:2px solid var(--accent-secondary); margin-bottom:1rem; font-size:0.8rem;">${p.note}</div>`
        : ""
      }
                <div class="stack-list">
                    ${p.stack
        .map((s) => `<span class="badge">${s}</span>`)
        .join("")}
                </div>
            </article>
        `;
    grid.innerHTML += card;
  });
}

/* --- 4. CONTACT COPY LOGIC --- */
function initCopyLogic() {
  const btn = document.getElementById("copyBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    navigator.clipboard.writeText("jasbeersinghchauhan377@gmail.com");
    const originalText = btn.innerText;
    btn.innerText = "✓ Copied to Clipboard";
    btn.style.color = "var(--accent-primary)";
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.color = "var(--text-muted)";
    }, 2000);
  });
}

/* --- 5. NETWORK TOPOLOGY BACKGROUND --- */
function initNetworkBackground() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width,
    height,
    particles = [];
  const config = {
    particleColor: "rgba(88, 166, 255, 0.5)",
    lineColor: "rgba(88, 166, 255, 0.15)",
    particleAmount: 60,
    defaultSpeed: 0.5,
    linkRadius: 150,
  };

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * config.defaultSpeed;
      this.vy = (Math.random() - 0.5) * config.defaultSpeed;
      this.size = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
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
  function loop() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    linkParticles();
    requestAnimationFrame(loop);
  }
  function linkParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < config.linkRadius) {
          ctx.beginPath();
          ctx.strokeStyle = config.lineColor;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  window.addEventListener("resize", resize);
  resize();
  for (let i = 0; i < config.particleAmount; i++)
    particles.push(new Particle());
  loop();
}

/* --- 6. SYSTEM CLOCK & UPTIME --- */
function initSystemClock() {
  const timeDisplay = document.getElementById("utc-time");
  const uptimeDisplay = document.getElementById("uptime-counter");
  if (!timeDisplay || !uptimeDisplay) return;

  let start = sessionStorage.getItem("sys_start_time") || Date.now();
  sessionStorage.setItem("sys_start_time", start);
  start = parseInt(start, 10);

  setInterval(() => {
    const now = new Date();
    timeDisplay.innerText = `UTC: ${now.toISOString().split("T")[1].split(".")[0]
      }`;
    const diff = Date.now() - start;
    const h = Math.floor(diff / 3600000)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((diff % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const s = Math.floor((diff % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    uptimeDisplay.innerText = `UP: ${h}:${m}:${s}`;
  }, 1000);
}

/* --- MODAL LOGIC & SNIPPETS --- */
const codeSnippets = {
  "Multithreaded Proxy Server": `// C++20 Thread Pool Implementation
void ThreadPool::worker_thread() {
    while (true) {
        std::function<void()> task;
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            condition.wait(lock, [this]{ return stop || !tasks.empty(); });
            if (stop && tasks.empty()) return;
            task = std::move(tasks.front());
            tasks.pop();
        }
        task(); // Execute Task
    }
}`,
  "Secure Real-Time Messaging API": `// Scaling WebSockets with Redis Adapter
const { createAdapter } = require("@socket.io/redis-adapter");
const { Redis } = require("ioredis");

const pubClient = new Redis(process.env.REDIS_URL);
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
    socket.on("publish_message", (payload) => {
        // Broadcasts to specific room across all server nodes
        socket.to(payload.roomID).emit("message", payload);
    });
});`,
};

function openCodeModal(title) {
  const modal = document.getElementById("code-modal");
  const titleEl = document.getElementById("modal-title");
  const codeEl = document.getElementById("modal-code");
  if (modal && titleEl && codeEl) {
    titleEl.innerText = title + " / Core_Logic";
    codeEl.innerText = codeSnippets[title] || "// Source unavailable.";
    modal.style.display = "flex";
  }
}

// Global Close Event
document.addEventListener("click", (e) => {
  if (e.target.id === "close-modal" || e.target.id === "code-modal") {
    document.getElementById("code-modal").style.display = "none";
  }
});
