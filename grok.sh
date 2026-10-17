#!/usr/bin/env bash
# grok.sh — one-shot headless Grok Build with no-plan + always-approve
# Usage:
#   ./grok.sh fix the null check in auth.py and add a unit test
#   ./grok.sh -c now add the integration test too
#   ./grok.sh --continue continue from where we left off

set -euo pipefail

if ! command -v grok >/dev/null 2>&1; then
  echo "Error: 'grok' not found in PATH. Install it first:" >&2
  echo "  curl -fsSL https://x.ai/cli/install.sh | bash" >&2
  exit 1
fi

if [[ $# -eq 0 ]]; then
  echo "Usage: $0 [-c|--continue] <prompt words...>" >&2
  echo "Example: $0 add rate limiting to the API using Redis" >&2
  exit 1
fi

# Optional continue flag
EXTRA_FLAGS=()
if [[ "$1" == "-c" || "$1" == "--continue" ]]; then
  EXTRA_FLAGS+=("--continue")
  shift
fi

# Everything left is the prompt (no quotes required by the caller)
PROMPT="$*"

exec grok \
  --no-plan \
  --always-approve \
  --no-auto-update \
  "${EXTRA_FLAGS[@]}" \
  -p "$PROMPT"
