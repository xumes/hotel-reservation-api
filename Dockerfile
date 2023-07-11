# Use the official Node.js 14 image as the base image
FROM node:14

# Install netcat
RUN apt-get update && apt-get install -y netcat

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the wait-for-it script to the container
COPY ./.docker/wait-for-db.sh /app/wait-for-db.sh

# Expose the port that your application listens on
EXPOSE 3000

# Start the application
CMD [ "sh", "-c", "/app/wait-for-db.sh db:3306 &&  npm test && npm run dev" ]
