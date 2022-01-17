# Create image based on the official Node 10 image from dockerhub
FROM node:14

# Create a directory where our app will be placed
RUN mkdir -p /app


# install json server
RUN npm install -g json-server

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy the database file
COPY ./db.json ./


# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["json-server", "--H", "0.0.0.0", "db.json"]
