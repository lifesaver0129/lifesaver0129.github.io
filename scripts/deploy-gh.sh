#!/usr/bin/env bash
set -euo pipefail

BRANCH="gh-pages"
BUILD_DIR="dist"
PUBLISH_DIR=".gh-pages-publish"

npm run build

rm -rf "$PUBLISH_DIR"
# Try to base worktree on remote branch if it exists; otherwise create new branch
if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  git worktree add -B "$BRANCH" "$PUBLISH_DIR" "origin/$BRANCH"
else
  git worktree add -B "$BRANCH" "$PUBLISH_DIR"
fi

rm -rf "$PUBLISH_DIR"/*
cp -R "$BUILD_DIR"/. "$PUBLISH_DIR"/

pushd "$PUBLISH_DIR" >/dev/null
if git status --porcelain | grep . >/dev/null; then
  git add --all
  git commit -m "Deploy"
  git push origin "$BRANCH"
else
  echo "No changes to deploy."
fi
popd >/dev/null

git worktree remove "$PUBLISH_DIR"
