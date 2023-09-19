#!/bin/bash
cd server/ && nodemon server.js & cd ../frontend/ && npm run serve

wait