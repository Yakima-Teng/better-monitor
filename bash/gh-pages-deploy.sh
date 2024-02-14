#!/usr/bin/env bash
cd dist
rm -rf .git
git init --initial-branch=main
git add -A
git commit -m 'update github pages'
git push -f https://github.com/Yakima-Teng/better-monitor.git main:gh-pages
