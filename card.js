// ===== Creative feature: rip a booster pack, pull a holographic superpower card =====
(function () {
  const d = window.PORTFOLIO;
  const c = d.card;
  const $ = (id) => document.getElementById(id);

  const overlay = $("packOverlay");
  const stage = $("stage");
  const pack = $("pack");
  const wrap = $("cardWrap");
  const card = $("card");
  let flipped = false;
  let lastFocus = null;
  let pulls = 0;
  let lastSecret = -1;

  // ---- fill card ----
  $("cardName").textContent = d.shortName || d.name;
  $("cardHp").textContent = c.hp;
  $("cardElement").textContent = c.element;
  $("cardClass").textContent = `${c.class} · Lv. 99`;
  $("cardPower").textContent = c.superpower;
  $("cardMove").textContent = c.signatureMove;
  $("cardWeak").textContent = c.weakness;
  $("cardFlavor").textContent = c.flavorText;
  const avatar = $("cardAvatar");
  if (c.photo) {
    avatar.innerHTML = `<img src="${c.photo}" alt="Photo of ${d.name}" />`;
  } else {
    avatar.textContent = c.initials || d.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  }
  $("cardStats").innerHTML = c.stats
    .map((s) => `<div class="stat-row"><span>${s.label}</span><div class="bar"><span style="width:${s.value * 10}%"></span></div><b>${s.value}</b></div>`)
    .join("");

  const rarities = [
    { name: "★ RARE", cls: "rare", w: 55 },
    { name: "★★ EPIC", cls: "epic", w: 33 },
    { name: "★★★ LEGENDARY", cls: "legendary", w: 12 }
  ];
  function rollRarity() {
    // first pull is always legendary — make a good first impression
    if (pulls === 1) return rarities[2];
    let r = Math.random() * 100;
    for (const x of rarities) { if ((r -= x.w) < 0) return x; }
    return rarities[0];
  }
  function rollCard() {
    pulls++;
    const rar = rollRarity();
    const el = $("cardRarity");
    el.textContent = rar.name;
    el.className = "rarity " + rar.cls;
    let i;
    do { i = Math.floor(Math.random() * c.funFacts.length); } while (c.funFacts.length > 1 && i === lastSecret);
    lastSecret = i;
    $("cardSecret").textContent = c.funFacts[i];
    return rar;
  }

  // ---- open / close ----
  function open() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("no-scroll");
    reset();
    setTimeout(() => pack.focus(), 50);
  }
  function close() {
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
    if (location.hash === "#card") history.replaceState(null, "", location.pathname);
  }
  function reset() {
    stage.classList.remove("opened");
    pack.classList.remove("ripped", "shake");
    wrap.classList.remove("show");
    setFlip(false, false);
  }

  function rip() {
    if (pack.classList.contains("ripped")) return;
    askMotionPermission();
    pack.classList.add("shake");
    setTimeout(() => {
      pack.classList.remove("shake");
      pack.classList.add("ripped");
      const rar = rollCard();
      setTimeout(() => {
        wrap.classList.add("show");
        stage.classList.add("opened");
        confetti(rar.cls === "legendary" ? 220 : 120);
        card.focus({ preventScroll: true });
      }, 250);
    }, 450);
  }

  function setFlip(state, animate = true) {
    flipped = state;
    if (animate) {
      card.classList.add("flipping");
      setTimeout(() => card.classList.remove("flipping"), 700);
    }
    card.style.setProperty("--flip", flipped ? "180deg" : "0deg");
  }

  function pullAgain() {
    wrap.classList.remove("show");
    stage.classList.remove("opened");
    setFlip(false, false);
    pack.classList.remove("ripped");
    void pack.offsetWidth;
    setTimeout(rip, 150);
  }

  document.querySelectorAll("[data-open-pack]").forEach((b) => b.addEventListener("click", open));
  pack.addEventListener("click", rip);
  pack.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); rip(); } });
  card.addEventListener("click", () => setFlip(!flipped));
  card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlip(!flipped); } });
  $("flipBtn").addEventListener("click", () => setFlip(!flipped));
  $("againBtn").addEventListener("click", pullAgain);
  $("doneBtn").addEventListener("click", close);
  $("overlayClose").addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => {
    if (!overlay.hidden && e.key === "Escape") close();
    // keep focus inside the dialog
    if (!overlay.hidden && e.key === "Tab") {
      const f = [...overlay.querySelectorAll("button, [tabindex='0']")].filter((el) => el.offsetParent !== null && getComputedStyle(el).pointerEvents !== "none");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // shareable deep link: yoursite.com/#card opens the pack directly
  if (location.hash === "#card") open();

  // ---- holographic tilt ----
  function tiltTo(px, py) {
    // px, py in 0..1
    const max = 16;
    card.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
    card.style.setProperty("--rx", `${(0.5 - py) * 2 * max}deg`);
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  }
  overlay.addEventListener("pointermove", (e) => {
    if (!wrap.classList.contains("show")) return;
    const r = card.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    tiltTo(px, py);
  });
  overlay.addEventListener("pointerleave", () => tiltTo(0.5, 0.5));

  let motionAsked = false;
  function askMotionPermission() {
    if (motionAsked) return;
    motionAsked = true;
    const D = window.DeviceOrientationEvent;
    if (D && typeof D.requestPermission === "function") {
      D.requestPermission().then((s) => s === "granted" && listenMotion()).catch(() => {});
    } else if (D) listenMotion();
  }
  function listenMotion() {
    window.addEventListener("deviceorientation", (e) => {
      if (!wrap.classList.contains("show") || e.gamma == null) return;
      const px = Math.min(1, Math.max(0, 0.5 + e.gamma / 60));
      const py = Math.min(1, Math.max(0, 0.5 + (e.beta - 45) / 60));
      tiltTo(px, py);
    });
  }

  // ---- confetti ----
  const cv = $("confetti");
  const ctx = cv.getContext("2d");
  let parts = [];
  let running = false;
  function confetti(n) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cv.width = innerWidth * devicePixelRatio;
    cv.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    const colors = ["#ffcc33", "#ff4f9a", "#7c5cff", "#23d5ab", "#ffffff"];
    for (let i = 0; i < n; i++) {
      parts.push({
        x: innerWidth / 2, y: innerHeight / 2,
        vx: (Math.random() - 0.5) * 16, vy: Math.random() * -16 - 4,
        s: Math.random() * 6 + 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
        c: colors[(Math.random() * colors.length) | 0], life: 0
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.life < 160 && p.y < innerHeight + 40);
    for (const p of parts) {
      p.life++; p.vy += 0.45; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    }
    if (parts.length) requestAnimationFrame(tick);
    else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
})();
