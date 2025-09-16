#!/usr/bin/env bash

set -euo pipefail

pushd extensions/vscode
npm ci
popd

pushd gui
npm ci
popd

pushd core
npm ci
npm i vectordb
popd

pushd gui
npm run build --max-old-space-size=4096
popd

pushd extensions/vscode
npm run prepackage
popd

pushd extensions/vscode
npm install -f esbuild
popd

pushd extensions/vscode
# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Create new version with short commit SHA (first 7 chars)
COMMIT_SHORT="$(git rev-parse --short HEAD)"
NEW_VERSION="${CURRENT_VERSION}-${COMMIT_SHORT:0:7}"

echo "📝 Updating package.json version from $CURRENT_VERSION to $NEW_VERSION"

# Update version in package.json
sed -i.bak "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json

# Remove backup file
rm -f package.json.bak

# Verify the change
echo "✅ New version: $(node -p "require('./package.json').version")"
popd

pushd extensions/vscode
npm run package
popd

pushd extensions/vscode
npx vsce package --no-dependencies
popd
