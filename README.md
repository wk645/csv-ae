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