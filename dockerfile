FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Install necessary build dependencies for sharp
RUN apt-get update && apt-get install -y build-essential libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev librsvg2-dev

# Expose the port that Gatsby will use
EXPOSE 8500

# Start Gatsby in development mode and bind to 0.0.0.0 to allow external access
CMD ["yarn", "run", "develop", "--port", "8500", "--host", "0.0.0.0"]