FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

RUN yarn cache clean

# Install dependencies
RUN yarn install --frozen-lockfile

# Install Gatsby CLI globally
RUN yarn global add gatsby-cli

# Install necessary build dependencies for sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    librsvg2-dev

# Copy the rest of the application code
COPY . .

# Expose the port that Gatsby will use
EXPOSE 8500

# Start Gatsby in development mode
CMD ["gatsby", "develop", "--port", "8500", "--host", "0.0.0.0"]
