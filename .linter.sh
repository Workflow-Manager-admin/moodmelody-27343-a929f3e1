#!/bin/bash
cd /home/kavia/workspace/code-generation/moodmelody-27343-a929f3e1/mood_melody_web_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

