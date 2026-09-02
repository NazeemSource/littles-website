#!/bin/sh
set -eu

TARGET="/home/cwebsite/public_html/littles-website"
STAGE="/home/cwebsite/public_html/.littles-website-incoming"

if [ "${SSH_ORIGINAL_COMMAND:-}" != "deploy-littles-website" ]; then
  echo "This key may only deploy the Little's website." >&2
  exit 1
fi

if [ -L "$TARGET" ]; then
  echo "Refusing to deploy through a symlink." >&2
  exit 1
fi

rm -rf -- "$STAGE"
mkdir -p -- "$STAGE" "$TARGET"
tar -xzf - -C "$STAGE"
rsync -a --delete "$STAGE/" "$TARGET/"
rm -rf -- "$STAGE"
