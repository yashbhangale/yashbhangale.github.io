# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Gatsby site
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Command to run the site using Gatsby's develop command
CMD ["npm", "run", "develop", "--", "-H", "0.0.0.0"]
