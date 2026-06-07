#!/usr/bin/env bash
# One-command publish for @nucel/ui.
#
#   1) one-time:  npm login
#   2) then:      bash publish.sh
#
# Safe: it refuses to publish unless the version looks like a fresh bump,
# builds + type-checks first, and shows you exactly what will go out.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

NAME=$(node -p "require('./package.json').name")
VER=$(node -p "require('./package.json').version")
echo "── Publishing ${NAME}@${VER} ──"

# 0. must be logged in
if ! npm whoami >/dev/null 2>&1; then
  echo "✗ Not logged in to npm. Run:  npm login   (then re-run this script)"; exit 1
fi
echo "  npm user: $(npm whoami)"

# 1. refuse to re-publish an already-published version
if npm view "${NAME}@${VER}" version >/dev/null 2>&1; then
  echo "✗ ${NAME}@${VER} is ALREADY published. Bump the version in package.json first."; exit 1
fi

# 2. build + type-check so we never ship a broken package
echo "── Building + type-checking ──"
mise exec -- bun install >/dev/null 2>&1 || bun install >/dev/null 2>&1 || true
( mise exec -- bun run build && mise exec -- bun run check ) 2>&1 | tail -6

# 3. show what will be published, then publish
echo "── Files that will ship ──"
npm publish --dry-run 2>&1 | grep -E "npm notice|Tarball|files:|package size|total files" | tail -20

read -r -p "Publish ${NAME}@${VER} to npm now? [y/N] " ok
[ "${ok:-N}" = "y" ] || [ "${ok:-N}" = "Y" ] || { echo "aborted."; exit 0; }

npm publish --access public
echo "✓ Published ${NAME}@${VER}"
echo "  Next: I'll repoint the nucel frontend to consume it from the registry."
