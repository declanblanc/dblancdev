// ─── Navigation ───────────────────────────────────────────────────────────────
// To add a new page to the nav, add an entry to NAV_LINKS below.
const NAV_LINKS = [
  { href: "index.html",    label: "home" },
  { href: "creators.html", label: "creators" },
  { href: "blocking.html", label: "blocking" },
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
      <ul class="nav-links">${items}</ul>
    </nav>`;

  const inject = () => document.body.prepend(header);
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", inject)
    : inject();
})();
