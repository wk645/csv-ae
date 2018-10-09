# Back End Boilerplate

A back end boilerplate for stardandizing development of new Node, Express based rest api projects.

Uses: [Express] (https://www.npmjs.com/package/express)

## Setup

Dependencies are managed using [NPM](https://www.npmjs.com/).

```sh
# Install local dependencies
npm install
```

## Commands

### Development

```sh
# Start Webpack development server
npm start
```

### Build - Other than dev

```sh
# Transpile to ES6 by running
npm run compile

# Run by using
npm run start
```

### When in Dev Mode use

```sh
# If in Dev mode you can skip the compile/start steps and run
npm run dev
```

```sh
# If debugging in dev mode, to add the --inspect flag, use:
npm run dev:debug
```

### Linting support

```sh
# To run eslint
npm run lint
```

```sh
# To automatically fix linting issues, run
npm run lint:fix
```

## Building your Docker Image

```sh
# From the directory where the Dockerfile is located:
# To build a Docker Image run [replace the app_name with your own if not using the boilerplate]
# The -t flag lets you tag your image so it's easier to find later using the docker images comman
docker build -t <your username>/boilerplate_back_end_web .
```

```sh
# To verify that your image is listed by Docker, run:
docker images
```

## Running your Docker Image

```sh
# To run the image
# Running your image with -d runs the container in detached mode, leaving the container running in the background. 
# The -p flag redirects a public port to a private port inside the container.
docker run -p 8080:8080 -d <your username>/boilerplate_back_end_web
# or run the following command to run it in attached mode:
docker run --rm -it -p 8080:8080 <your username>/boilerplate_back_end_web

# You can also use the --init flag to wrap your Node.js process with a 
# lightweight init system, which will respond to Kernel Signals like SIGTERM (CTRL-C) etc. For example, you can do:
docker run --rm -it --init -p 8080:8080 -v $(pwd):/app \ <your username>/node-docker-dev bash
```

```sh
# If you want to get container ID, run:
docker container ls 

# the following command will list the docker images: 
docker images list

# To Print app output, it should display: Running on http://localhost:8080 - run:
docker logs <container id>
```

```sh
# If you need to go inside the container you can use the exec command:
docker exec -it <container id> /bin/bash
```

```sh
# To test your app/api, use Curl or Postman to make a request to the port that you mapped the container to in your machine
# For example:
curl -i localhost:5000
```

## Tagging your Docker Image

```sh
# Docker will assign a default tag of latest after running docker build
# To avoid the problems around latest, be explicit with your build tags
docker tag boilerplate_back_end_web:latest convene/boilerplate_back_end_web:$SHA1  
docker tag boilerplate_back_end_web:latest convene/boilerplate_back_end_web:$BRANCH_NAME  
docker tag boilerplate_back_end_web:latest convene/build_$BUILD_NUM 
docker tag image username/repository:tag
```

## Publish your image

```sh
# Once complete, if you log into the docker hub you should see your image listed there
docker push username/repository:tag
```

## Pull and run the image from the remote repository

```sh
# From now on, you can use docker run and run your app on any machine with this command:
docker run -p 4000:80 username/repository:tag
```

### Docker cheat sheet

```sh
# List Docker CLI commands
docker
docker container --help

# Display Docker version and info
docker --version
docker version
docker info

# Execute Docker image
docker run hello-world

# List Docker images
docker image ls

# List Docker containers (running, all, all in quiet mode)
docker container ls
docker container ls --all
docker container ls -aq
```