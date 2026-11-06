// Renders the portfolio sections from data.js
(function () {
  const d = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  document.title = `${d.name} · Tech Superpowers`;
  $("heroName").textContent = d.name;
  $("heroTitle").textContent = d.title;
  $("heroTagline").textContent = d.tagline;
  $("heroLocation").textContent = d.location;
  $("year").textContent = new Date().getFullYear();

  $("aboutText").innerHTML = d.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("quickFacts").innerHTML = d.quickFacts
    .map((f) => `<li><span class="label">${esc(f.label)}</span><span class="value">${esc(f.value)}</span></li>`)
    .join("");

  $("powers").innerHTML = d.superpowers
    .map(
      (p) => `
      <article class="power reveal">
        <div class="power-head">
          <span class="power-name"><span class="power-icon" aria-hidden="true">${p.icon}</span>${esc(p.name)}</span>
          <span class="power-lvl">PWR ${p.level}</span>
        </div>
        <div class="bar" role="progressbar" aria-label="${esc(p.name)} level" aria-valuenow="${p.level}" aria-valuemin="0" aria-valuemax="100"><span data-level="${p.level}"></span></div>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </article>`
    )
    .join("");

  $("projectList").innerHTML = d.projects
    .map((p) => {
      const links = [
        p.link && `<a href="${esc(p.link)}" target="_blank" rel="noopener">Live demo ↗</a>`,
        p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Code ↗</a>`
      ].filter(Boolean).join("");
      return `
      <article class="project reveal">
        <span class="project-emoji" aria-hidden="true">${p.emoji || "💡"}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.description)}</p>
        <ul class="tags">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${links ? `<div class="project-links">${links}</div>` : ""}
      </article>`;
    })
    .join("");

  $("achievements").innerHTML = (d.achievements || []).map((a) => `<li>${esc(a)}</li>`).join("");

  const contacts = [
    d.email && { href: `mailto:${d.email}`, label: "✉️ Email me", primary: true },
    d.github && { href: d.github, label: "🐙 GitHub" },
    d.linkedin && { href: d.linkedin, label: "💼 LinkedIn" },
    d.resume && { href: d.resume, label: "📄 Résumé" }
  ].filter(Boolean);
  $("contactLinks").innerHTML = contacts
    .map((c) => `<a class="btn ${c.primary ? "btn-primary" : "btn-ghost"}" href="${esc(c.href)}" ${c.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${c.label}</a>`)
    .join("");

  // Light / dark theme toggle
  const themeBtn = $("themeToggle");
  const syncThemeBtn = () => {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    themeBtn.textContent = light ? "☀️" : "🌙";
    themeBtn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  };
  syncThemeBtn();
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeBtn();
  });

  // Scroll reveal + power bars fill when visible
  document.querySelectorAll(".section-title, .about-grid, .contact-links").forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visible");
        e.target.querySelectorAll(".bar span[data-level]").forEach((b) => (b.style.width = b.dataset.level + "%"));
        io.unobserve(e.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Active nav link highlighting
  const links = [...document.querySelectorAll(".nav-links a")];
  const navIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => navIO.observe(s));
})();
