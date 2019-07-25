#!/usr/bin/env bash
set -e

VERSION=$(node -p "const { version } = require('./package.json'); version")

read -p "Releasing ${VERSION} - are you sure? (y/n)" -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build
  npm run build

  # publish
  npm publish
fi
