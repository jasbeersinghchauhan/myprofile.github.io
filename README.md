# 🖥️ JA_CHAUHAN | Systems-Oriented Portfolio

![System Status](https://img.shields.io/badge/System_Status-ONLINE-success?style=for-the-badge)
![Focus](https://img.shields.io/badge/Focus-Backend_Engineering-blue?style=for-the-badge)
![Core](https://img.shields.io/badge/Core-C++_&_Node.js-white?style=for-the-badge)

A terminal-inspired personal portfolio designed for a Backend Engineer. It bridges the gap between low-level systems programming and modern web architecture, featuring a simulated kernel boot sequence, interactive shell, and keyboard-driven navigation.

**[View Live Demo](#)** _(Add your Vercel/Netlify link here)_

---

## 🚀 System Architecture (Features)

This is not just a static HTML page. The interface includes several interactive modules written in Vanilla JavaScript to simulate a developer environment:

- **Interactive Terminal Shell:**
  - Simulated **Boot Sequence** (Kernel initialization, Network topology mapping).
  - Functional CLI with command history support (`ArrowUp`/`ArrowDown`).
  - Supported commands: `ls`, `cat`, `whoami`, `projects`, `clear`, `help`.
- **Command Palette (`Ctrl + K`):** Global navigation overlay for rapid system traversal.
- **Logic Inspector:** A modal system that allows visitors to view "code snippets" of backend projects directly within the UI.
- **Visuals:**
  - HTML5 Canvas particle network background.
  - Live UTC Clock and System Uptime counter.
  - Cyberpunk/Dark-mode aesthetic using `JetBrains Mono`.

---

## 🛠️ Technical Arsenal

### Portfolio Stack

- **Frontend:** HTML5, CSS3 (Custom Variables, Flexbox/Grid)
- **Logic:** Vanilla JavaScript (ES6+)
- **Fonts:** JetBrains Mono (Google Fonts)

### Backend Skills (Highlighted in Portfolio)

- **Languages:** C++20 (STL, RAII, Smart Pointers), Node.js, SQL.
- **Concepts:** Multi-threading, Socket Programming (Winsock2), Semaphores, ACID Compliance.
- **Infrastructure:** Redis (Pub/Sub), MongoDB, Docker.

---

## 📂 Featured Projects

The portfolio showcases specific high-performance engineering projects (configured in `script.js`):

### 1. Multithreaded Web Proxy

- **Status:** Refactored v2
- **Tech:** C++20, Winsock2, Smart Pointers
- **Description:** A high-concurrency proxy server utilizing a thread-per-client model. Features **O(1) LRU Caching** and Semaphore throttling to handle high traffic loads.

### 2. Secure Real-Time Messaging API

- **Status:** Deployment Ready
- **Tech:** Node.js, Redis Pub/Sub, JWT
- **Description:** Distributed WebSocket architecture with End-to-End Encryption (E2EE). Uses Redis adapters for horizontal scaling across nodes.

### 3. Library Management System

- **Status:** v1.0.0
- **Tech:** C++, MySQL, System Design
- **Description:** An ACID-compliant backend system ensuring transactional integrity for data operations.

---

## 🕹️ Usage & Commands

### Running Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/jasbeersinghchauhan/portfolio.git](https://github.com/jasbeersinghchauhan/portfolio.git)
    ```
2.  Open `index.html` in your browser (or use VS Code "Live Server").

### Terminal Commands

Once the intro boot sequence finishes, try typing these into the home page terminal:

| Command      | Action                             |
| :----------- | :--------------------------------- |
| `help`       | List available commands            |
| `ls`         | List virtual directory contents    |
| `cat [file]` | Read files (e.g., `cat about.txt`) |
| `projects`   | Redirect to the Projects module    |
| `whoami`     | Display current user session       |

---

## 📬 Contact Handshake

- **Email:** jasbeersinghchauhan377@gmail.com
- **GitHub:** [github.com/jasbeersinghchauhan](https://github.com/jasbeersinghchauhan)
- **LinkedIn:** [linkedin.com/in/jasbeer-singh-chauhan](https://linkedin.com/in/jasbeer-singh-chauhan)

---

> _"I specialize in the bridge between low-level performance and scalable web architecture."_