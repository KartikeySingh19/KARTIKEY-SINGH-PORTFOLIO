/* ==========================================================
   Developer Portfolio – script.js
   1) CONFIG  → edit everything personal here
   2) Rendering, navigation, animations, filtering, form, GitHub
   ========================================================== */

/* ---------------- 1) CONFIG ---------------- */
const CONFIG = {
  name: "Kartikey Singh",
  role: "Aspiring Full-Stack Developer",
  intro: "I'm Kartikey Singh, an aspiring developer focused on building practical, responsive and user-friendly digital experiences. I enjoy solving problems, learning modern technologies and turning ideas into working projects.",
  about: [
    "I am passionate about software development and enjoy working across programming fundamentals and modern web technologies. My interests include problem solving, data structures and algorithms, and creating clean interfaces that make applications easy to use.",
    "I am continuously strengthening my skills in C++, Java, Python and JavaScript while exploring frontend and backend development with React, Node.js and MongoDB. I aim to build meaningful projects, learn through hands-on practice and grow into a versatile full-stack developer."
  ],
  email: "kartiksinghr12@gmail.com",
  location: "Varanasi",
  githubUser: "KartikeySingh19",                         // https://github.com/<githubUser>
  linkedin: "https://www.linkedin.com/in/kartikey-singh-1254aa368/",
  formEndpoint: "",   // Optional: Formspree / Getform URL. Empty = form opens the visitor's email app.

  // Rotating text in the hero ("I build ...")
  typing: [
    "responsive, modern web apps",
    "efficient programs in C++ & Java",
    "solutions to DSA problems",
    "full-stack apps with Node & MongoDB"
  ],

  // [label, icon file name inside assets/icons/ (without .svg)]
  skills: {
    "Programming": [["C++", "cpp"], ["Java", "java"], ["Python", "python"], ["JavaScript", "javascript"]],
    "Frontend": [["HTML", "html5"], ["HTML5", "html5"], ["CSS", "css3"], ["CSS3", "css3"], ["React.js", "react"], ["Tailwind CSS", "tailwind"]],
    "Backend & Database": [["Node.js", "nodejs"], ["MongoDB", "mongodb"]],
    "DSA & Core Skills": [["Data Structures and Algorithms", "dsa"], ["Problem Solving", "solving"]],
    "Tools": [["VS Code", "vscode"], ["IntelliJ IDEA", "intellij"], ["Git", "git"], ["Git Bash", "gitbash"], ["GitHub", "github"]]
  },

  // Links are built from githubUser + repo. Override per project with `github:` / `live:` full URLs.
  projects: [
    {
      name: "Password Generator", cat: "Utilities", repo: "password-generator", tech: ["HTML", "CSS", "JavaScript"],
      desc: "Create strong, random passwords with adjustable length and character options."
    },
    {
      name: "Weather App", cat: "Web Apps", repo: "weather-app", tech: ["HTML", "CSS", "JavaScript", "REST API"],
      desc: "Search a city and see current temperature, conditions and more from a weather API."
    },
    {
      name: "Student Management System", cat: "Web Apps", repo: "student-management-system", tech: ["Node.js", "MongoDB", "JavaScript"],
      desc: "Add, view, update and delete student records through a simple management dashboard."
    },
    {
      name: "Flip Flop Game", cat: "Games", repo: "flip-flop-game", tech: ["HTML", "CSS", "JavaScript"],
      desc: "A card-flipping memory game: match the pairs in as few moves as possible."
    },
    {
      name: "Colour Square Game", cat: "Games", repo: "colour-square-game", tech: ["HTML", "CSS", "JavaScript"],
      desc: "Test your eyes by picking the matching colour square as the challenge gets harder."
    },
    {
      name: "Typing Tutor", cat: "Web Apps", repo: "typing-tutor", tech: ["HTML", "CSS", "JavaScript"],
      desc: "Practise typing with live feedback on speed and accuracy."
    },
    {
      name: "Calculator Using C++", cat: "C++", repo: "calculator-cpp", tech: ["C++", "Console"],
      desc: "A menu-driven console calculator that handles common arithmetic operations."
    },
    {
      name: "Real-Time Calendar", cat: "Utilities", repo: "real-time-calendar", tech: ["HTML", "CSS", "JavaScript"],
      desc: "A dynamic calendar that highlights today's date and lets you browse months."
    },
    {
      name: "Real-Time Digital Clock", cat: "Utilities", repo: "digital-clock", tech: ["HTML", "CSS", "JavaScript"],
      desc: "A live digital clock that shows the current time and date, updating every second."
    }
  ],

  education: [
    {
      period: "2025 – 2029", title: "Bachelor of Technology in computer Science & Engineering",
      place: "Shri Ramswaroop memorial University",
    },
  ]
};

/* ---------------- 2) APP ---------------- */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isPlaceholder = u => /YOUR_USERNAME|your-username|example\.com/i.test(u);
  const ext = 'target="_blank" rel="noopener noreferrer"';

  /* Small toast helper */
  let toastTimer;
  const toast = msg => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3400);
  };

  /* ----- Personal details → page ----- */
  const initials = CONFIG.name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const data = { ...CONFIG, initials };
  $$("[data-bind]").forEach(el => { el.textContent = data[el.dataset.bind] ?? el.textContent; });
  document.title = `${CONFIG.name} | Developer Portfolio`;
  $("#emailLink").href = `mailto:${CONFIG.email}`;
  $("#ghLink").href = `https://github.com/${CONFIG.githubUser}`;
  $("#year").textContent = new Date().getFullYear();
  $("#aboutText").innerHTML = CONFIG.about.map(t => `<p>${t}</p>`).join("");
  $("#projCount").textContent = CONFIG.projects.length;

  const socials = [
    { label: "GitHub", url: `https://github.com/${CONFIG.githubUser}`, icon: "assets/icons/github.svg" },
    { label: "LinkedIn", url: CONFIG.linkedin },
    { label: "Email", url: `mailto:${CONFIG.email}` }
  ];
  const socialHTML = socials.map(s =>
    `<li><a class="pill" href="${s.url}" ${s.url.startsWith("http") ? ext : ""}>${s.icon ? `<img src="${s.icon}" alt="" width="16" height="16">` : ""}${s.label}</a></li>`).join("");
  ["heroSocials", "contactSocials", "footSocials"].forEach(id => { $("#" + id).innerHTML = socialHTML; });

  /* ----- Skills ----- */
  $("#skillGrid").innerHTML = Object.entries(CONFIG.skills).map(([cat, items]) => `
    <article class="sk-card glass reveal">
      <h3>${cat}</h3>
      <ul class="badges">${items.map(([n, i]) =>
    `<li class="badge"><img src="assets/icons/${i}.svg" alt="" width="18" height="18" loading="lazy">${n}</li>`).join("")}</ul>
    </article>`).join("");

  /* ----- Projects + filter ----- */
  const ghUrl = p => p.github || `https://github.com/${CONFIG.githubUser}/${p.repo}`;
  const liveUrl = p => p.live || `https://${CONFIG.githubUser}.github.io/${p.repo}/`;
  const cats = ["All", ...new Set(CONFIG.projects.map(p => p.cat))];

  $("#filters").innerHTML = cats.map((c, i) =>
    `<button class="fbtn" type="button" data-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join("");

  $("#projectGrid").innerHTML = CONFIG.projects.map((p, i) => `
    <article class="pcard glass reveal" data-cat="${p.cat}" style="--h:${(i * 41 + 160) % 360}">
      <div class="thumb" aria-hidden="true"><span>${String(i + 1).padStart(2, "0")}</span><em>${p.cat}</em></div>
      <div class="pbody">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <ul class="tags">${p.tech.map(t => `<li>${t}</li>`).join("")}</ul>
        <div class="plinks">
          <a class="btn" href="${ghUrl(p)}" ${ext} aria-label="${p.name} on GitHub">GitHub</a>
          <a class="btn primary" href="${liveUrl(p)}" ${ext} aria-label="${p.name} live demo">Live Demo</a>
        </div>
      </div>
    </article>`).join("");

  $("#filters").addEventListener("click", e => {
    const btn = e.target.closest(".fbtn");
    if (!btn) return;
    $$(".fbtn").forEach(b => b.setAttribute("aria-pressed", b === btn));
    $$(".pcard").forEach(card => {
      const show = btn.dataset.filter === "All" || card.dataset.cat === btn.dataset.filter;
      card.hidden = !show;
      if (show) card.classList.add("in");   // re-appearing cards restart the "pop" animation automatically
    });
  });

  /* ----- Education ----- */
  $("#timeline").innerHTML = CONFIG.education.map(e => `
    <article class="tl-item glass reveal">
      <time>${e.period}</time><h3>${e.title}</h3><p class="place">${e.place}</p><p>${e.note}</p>
    </article>`).join("");

  /* ----- Typing animation ----- */
  const typed = $("#typed");
  if (reduceMotion) {
    typed.textContent = CONFIG.typing[0];
  } else {
    let word = 0, chars = 0, deleting = false;
    (function tick() {
      const w = CONFIG.typing[word];
      typed.textContent = w.slice(0, chars);
      let delay = deleting ? 35 : 70;
      if (!deleting && chars === w.length) { deleting = true; delay = 1500; }
      else if (deleting && chars === 0) { deleting = false; word = (word + 1) % CONFIG.typing.length; delay = 350; }
      else chars += deleting ? -1 : 1;
      setTimeout(tick, delay);
    })();
  }

  /* ----- Navbar state, back-to-top ----- */
  const nav = $(".nav"), toTop = $("#toTop");
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 20);
    toTop.classList.toggle("show", scrollY > 600);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ----- Mobile menu ----- */
  const burger = $("#burger"), menu = $("#menu");
  const setMenu = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* ----- Smooth scrolling for every in-page link ----- */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    const target = a && a.hash.length > 1 && $(a.hash);
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", a.hash);
  });

  /* ----- Placeholder links: tell the owner instead of opening a 404 ----- */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="http"], a[href^="mailto"]');
    if (a && isPlaceholder(a.href)) {
      e.preventDefault();
      toast("Placeholder link – update it in js/script.js (CONFIG).");
    }
  });

  /* ----- Active nav link while scrolling ----- */
  const links = $$(".menu a");
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle("active", l.hash === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));

  /* ----- Scroll reveal ----- */
  const reveal = new IntersectionObserver((entries, obs) => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach(el => reveal.observe(el));

  /* ----- Contact form ----- */
  const form = $("#form"), status = $("#status");
  const say = (msg, ok) => { status.textContent = msg; status.className = "status " + (ok ? "ok" : "bad"); };
  const rules = {
    name: v => v.trim().length >= 2 || "Please enter your name (at least 2 characters).",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address.",
    message: v => v.trim().length >= 10 || "Your message should be at least 10 characters."
  };
  const check = f => {
    const r = rules[f.name](f.value), ok = r === true;
    f.classList.toggle("invalid", !ok);
    f.setAttribute("aria-invalid", !ok);
    $("#e-" + f.name).textContent = ok ? "" : r;
    return ok;
  };
  const fields = [...form.elements].filter(f => rules[f.name]);
  form.addEventListener("input", e => { if (e.target.classList.contains("invalid")) check(e.target); });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    status.textContent = "";
    if (!fields.map(check).every(Boolean)) return fields.find(f => f.classList.contains("invalid")).focus();

    const d = Object.fromEntries(fields.map(f => [f.name, f.value.trim()]));
    if (CONFIG.formEndpoint) {                       // Mode A: hosted form service
      try {
        const res = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        say("Thanks! Your message has been sent.", true);
      } catch { say("Could not send right now. Please email me directly.", false); }
      return;
    }
    if (isPlaceholder(CONFIG.email)) return say("Set your real email in js/script.js (CONFIG.email) to enable sending.", false);
    const subject = encodeURIComponent("Portfolio message from " + d.name);   // Mode B: mailto
    const body = encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`);
    location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    say("Opening your email app…", true);
  });

  /* ----- GitHub stats (public API, no key needed) ----- */
  const user = CONFIG.githubUser, note = $("#ghNote");
  if (isPlaceholder(user)) {
    note.textContent = "Set githubUser in js/script.js to show live GitHub stats.";
  } else {
    fetch(`https://api.github.com/users/${user}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(u => {
        $("#ghRepos").textContent = u.public_repos;
        $("#ghFollowers").textContent = u.followers;
        $("#ghFollowing").textContent = u.following;
        return fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=4`);
      })
      .then(r => r.json())
      .then(repos => {
        $("#repoList").innerHTML = repos.map(r =>
          `<li><a href="${r.html_url}" ${ext}><b>${r.name}</b><span>${r.language || ""}</span></a></li>`).join("");
      })
      .catch(() => { note.textContent = "Couldn't load live GitHub data right now."; });
  }
})();
