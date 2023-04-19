#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy --preview-feature

# Start the application
npm start
