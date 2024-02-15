#!/usr/bin/env bash
set -e

echo "Enter release version: "
read VERSION

echo "Enter commit comment: "
read COMMENT

VERSION=$VERSION COMMENT=$COMMENT npm run buildAndDeploy

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION: $COMMENT"
  npm --registry=https://registry.npmjs.org version $VERSION --message "[release] $VERSION"

  # publish
  git push origin refs/tags/v$VERSION
  git push

  # set proxy
  export https_proxy=http://127.0.0.1:7890
  export http_proxy=http://127.0.0.1:7890
  export all_proxy=socks5://127.0.0.1:7890

  npm --registry=https://registry.npmjs.org publish
fi
