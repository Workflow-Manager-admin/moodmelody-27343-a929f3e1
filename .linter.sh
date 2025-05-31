#!/bin/bash
cd /home/kavia/workspace/code-generation/moodmelody-27343-a929f3e1/moodmelody
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

