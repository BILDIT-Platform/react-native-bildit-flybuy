#!/bin/bash
## This script is used to copy the ReactCodegen headers to the React_Codegen headers
## Because the project is using the React_Codegen headers and this is just a workaround to fix the build
## Maybe this will be fixed after upgrading to React Native 0.77.*

# Exit on error
set -e

# Source and destination paths
SOURCE_DIR="ios/Pods/Headers/Public/ReactCodegen"
DEST_DIR="ios/Pods/Headers/Public/React_Codegen"

echo "📂 Copying ReactCodegen to React_Codegen..."

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory $SOURCE_DIR does not exist!"
    exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy all contents
cp -R "$SOURCE_DIR"/* "$DEST_DIR"/

echo "✅ Successfully copied ReactCodegen to React_Codegen"
echo "   From: $SOURCE_DIR"
echo "   To: $DEST_DIR"
