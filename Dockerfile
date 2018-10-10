# Specify the image we want to build from. 
# Check out the Docker Hub for additional information and to browse the list of available images:
# https://hub.docker.com/

# Using an appropriate base image (carbon for dev, alpine for production)
FROM node:10.11

# Create app directory
WORKDIR /boilerplate-back-end-web

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
# Copy the current directory contents into the container at /boilerplate-back-end-webdo
COPY . /boilerplate-back-end-web

# Expose and bind a port to make the app available
EXPOSE 8080

# Set Environment variables
ENV  NODE_ENV production

# Transpile assets using babel 
# This is a multi stage build, this explains the npm run and the CMD after
RUN npm run compile

# Command to run the app
CMD [ "npm", "run", "start"]
