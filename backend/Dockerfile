# Use Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose backend port
EXPOSE 5000

# Run server
CMD ["node", "server.js"]