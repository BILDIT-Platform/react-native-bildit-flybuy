#!/bin/bash

# only use this when working on iOS sdk

# Define source and destination directories, please adjust the path with your local based on the package that you are working on
# The options are `core` `notify` `pickup` `presence` and `livestatus`
SOURCE_DIR="/Users/addingama/Workspace/react-native/bildit-flybuy/example/node_modules/@bildit-platform/rn-flybuy-core/"
DEST_DIR="/Users/addingama/Workspace/react-native/bildit-flybuy/mono/packages/core/"

# Watch the source directory for changes and copy files using rsync
fswatch -0 $SOURCE_DIR | while read -d "" event
do
    rsync -av --delete $SOURCE_DIR $DEST_DIR
done