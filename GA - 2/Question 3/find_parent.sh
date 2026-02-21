#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./find_parent.sh <target_timeout_value>"
    echo "Example: ./find_parent.sh 120"
    exit 1
fi

TARGET=$1

COMMIT=$(git log -G "\"timeout\": $TARGET" --format="%H" -- config.json | tail -n 1)

if [ -n "$COMMIT" ]; then
    PARENT=$(git log --format="%p" -n 1 "$COMMIT" | awk '{print $1}')

    echo "Commit setting timeout to $TARGET: $COMMIT"
    echo "Parent commit short hash (Your Answer): ${PARENT:0:7}"
else
    echo "Could NOT find a commit setting timeout to $TARGET in this repository."
    echo "Are you sure you ran this inside the extracted Git repository folder?"
    echo "Error: Incorrect commit hash. Make sure you found the parent of the commit that set timeout to $TARGET."
fi
