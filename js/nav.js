// ─── Navigation ───────────────────────────────────────────────────────────────
// To add a new page to the nav, add an entry to NAV_LINKS below.
const NAV_LINKS = [
  { href: "posts.html", label: "posts" },
];

(function () {
  const path    = window.location.pathname;
  const current = (path === "/" || path === "") ? "index.html" : path.split("/").pop();

  const items = NAV_LINKS.map(({ href, label }) =>
    `<li><a href="${href}"${current === href ? ' class="active"' : ""}>${label}</a></li>`
  ).join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <nav class="nav">
      <a href="index.html" class="nav-brand">dblanc.dev</a>
      <ul class="nav-links nav-links--inline">${items}</ul>
    </nav>`;

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<p><a href="https://github.com/declanblanc" target="_blank">GitHub</a> · <a href="https://www.linkedin.com/in/declanblanc" target="_blank">LinkedIn</a></p>`;

  const inject = () => {
    if (document.querySelector(".site-header") || document.querySelector(".site-footer")) return;
    document.body.prepend(header);
    document.body.append(footer);
  };
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", inject)
    : inject();
})();
