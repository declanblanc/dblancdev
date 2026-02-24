#!/usr/bin/env bash
# new-post.sh — scaffold a new post for dblanc.dev
#
# Usage:
#   ./new-post.sh                              # fully interactive
#   ./new-post.sh <slug>                       # prompts for title (auto-detects from H1)
#   ./new-post.sh <slug> "<Title>"             # prompts for date (defaults to today)
#   ./new-post.sh <slug> "<Title>" MM/DD/YYYY  # fully non-interactive

set -euo pipefail

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

green() { printf '\033[0;32m%s\033[0m\n' "$*"; }
dim()   { printf '\033[2m%s\033[0m\n'   "$*"; }
err()   { printf '\033[0;31mError: %s\033[0m\n' "$*" >&2; exit 1; }

sanitize() { echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-'; }

# ── collect inputs ─────────────────────────────────────────────────────────────
SLUG="${1:-}"
TITLE="${2:-}"
POST_DATE="${3:-}"

[[ -z "$SLUG" ]] && { printf 'Slug (e.g. my-post): '; read -r SLUG; }
SLUG="$(sanitize "$SLUG")"
[[ -z "$SLUG" ]] && err "slug cannot be empty"

MD_FILE="$SITE_DIR/md/${SLUG}.md"
HTML_FILE="$SITE_DIR/${SLUG}.html"

if [[ -z "$TITLE" ]]; then
  AUTO=""
  [[ -f "$MD_FILE" ]] && AUTO="$(grep -m1 '^# ' "$MD_FILE" 2>/dev/null | sed 's/^# //' || true)"
  [[ -n "$AUTO" ]] && printf 'Title [%s]: ' "$AUTO" || printf 'Title: '
  read -r TITLE
  TITLE="${TITLE:-$AUTO}"
fi
[[ -z "$TITLE" ]] && err "title cannot be empty"

if [[ -z "$POST_DATE" ]]; then
  TODAY="$(date '+%m/%d/%Y')"
  printf 'Date [%s]: ' "$TODAY"
  read -r POST_DATE
  POST_DATE="${POST_DATE:-$TODAY}"
fi

[[ -f "$HTML_FILE" ]] && err "${SLUG}.html already exists"

echo ""

# ── create markdown stub if the file doesn't exist yet ────────────────────────
if [[ ! -f "$MD_FILE" ]]; then
  { printf '# %s\n\n' "$TITLE"; printf '*%s*\n\n' "$POST_DATE"; printf '<!-- Write your post here -->\n'; } > "$MD_FILE"
  green "  created  md/${SLUG}.md"
else
  dim "  exists   md/${SLUG}.md"
fi

# ── generate HTML wrapper and update posts.html ───────────────────────────────
export SLUG TITLE POST_DATE SITE_DIR
python3 <<'PYEOF'
import os, html as _h

slug     = os.environ['SLUG']
title    = os.environ['TITLE']
date     = os.environ['POST_DATE']
site_dir = os.environ['SITE_DIR']

title_escaped = _h.escape(title)

# Use placeholder-based substitution to avoid f-string conflicts with JS braces
TEMPLATE = """\
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/markdown.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      rel="stylesheet"
    />
    <title>__TITLE__</title>
  </head>
  <body>
    <script src="js/nav.js"></script>

    <main class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><a href="posts.html">// posts</a></li>
          <li aria-current="page">__SLUG__</li>
        </ol>
      </nav>
      <article id="markdown-content"></article>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
      fetch("md/__SLUG__.md")
        .then((r) => {
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          return r.text();
        })
        .then((text) => {
          document.getElementById("markdown-content").innerHTML = marked.parse(text);
        })
        .catch((err) => {
          document.getElementById("markdown-content").innerHTML =
            `<p class="placeholder">Failed to load content: ${err.message}</p>`;
        });
    </script>
  </body>
</html>
"""

html_content = TEMPLATE.replace('__TITLE__', title_escaped).replace('__SLUG__', slug)

with open(f'{site_dir}/{slug}.html', 'w') as f:
    f.write(html_content)

# Prepend new entry to the top of the posts list
entry = (
    f'          <li>\n'
    f'            <a href="{slug}.html">{title_escaped}</a>\n'
    f'            <span class="meta">{date}</span>\n'
    f'          </li>'
)

posts_path = f'{site_dir}/posts.html'
with open(posts_path) as f:
    content = f.read()

marker = '<ul class="notes-list">'
assert marker in content, f'Could not find "{marker}" in posts.html'
content = content.replace(marker, marker + '\n' + entry, 1)

with open(posts_path, 'w') as f:
    f.write(content)
PYEOF

green "  created  ${SLUG}.html"
green "  updated  posts.html"
echo ""
echo "  \"${TITLE}\" is ready at ${SLUG}.html"
echo "  Edit md/${SLUG}.md to write your content."
echo ""
