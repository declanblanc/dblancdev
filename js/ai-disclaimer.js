document.querySelectorAll(".ai-badge").forEach((badge) => {
  badge.addEventListener("click", (e) => {
    e.stopPropagation();
    badge.classList.toggle("open");
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".ai-badge.open").forEach((b) => b.classList.remove("open"));
});
