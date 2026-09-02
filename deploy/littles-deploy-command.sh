#!/bin/sh
set -eu

BASE="/home/cwebsite/public_html/littles-website"
TARGET="$BASE/public"
STAGE="$BASE/.incoming"

if [ "${SSH_ORIGINAL_COMMAND:-}" != "deploy-littles-website" ]; then
  echo "This key may only deploy the Little's website." >&2
  exit 1
fi

if [ -L "$BASE" ] || [ -L "$TARGET" ]; then
  echo "Refusing to deploy through a symlink." >&2
  exit 1
fi

rm -rf -- "$STAGE"
mkdir -p -- "$BASE" "$STAGE" "$TARGET"
tar -xzf - -C "$STAGE"
rsync -a --delete "$STAGE/" "$TARGET/"
rm -rf -- "$STAGE"
