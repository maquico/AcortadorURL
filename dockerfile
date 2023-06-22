# Use the official Node.js image as the base image.
FROM node:latest

# Set the working directory in the container to /app.
WORKDIR /app

# Copy package.json and package-lock.json to the container.
COPY package.json package-lock.json ./

# Install dependencies using npm.
RUN npm ci --only=production

# Copy the rest of the application code to the container.
COPY . .

# Expose the port your application listens on (5000 in your case).
EXPOSE 5000

# Set any necessary environment variables.
ENV NODE_ENV production

# The default command to run when the container starts.
CMD [ "node", "main.js" ]
