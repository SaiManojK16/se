# Use Node.js LTS base image
FROM node:20.11.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 9000

# Command to run the application
CMD ["node", "server.js"]