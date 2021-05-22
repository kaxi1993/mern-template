# mern-template

[![npm version](https://badge.fury.io/js/mern-template.svg)](https://badge.fury.io/js/mern-template)
[![codecov](https://codecov.io/gh/kaxi1993/mern-template/branch/master/graph/badge.svg?token=GlU0v78NBF)](https://codecov.io/gh/kaxi1993/mern-template)
[![Known Vulnerabilities](https://snyk.io/test/github/kaxi1993/mern-template/badge.svg)](https://snyk.io/test/github/kaxi1993/mern-template)
[![npm](https://img.shields.io/npm/dt/mern-template.svg?maxAge=2592000)](https://www.npmjs.com/package/mern-template)

**mern-temlate** is a cli tool for generating isomorphic and modular mongo, express, react and node web app. The project is based on the best practices and popular tools. This is not just a simple starter that generates only the folder structure, but a real example of a production ready web application.

## Table of contents
* [Visualization](#visualization)
* [Installation](#installation)
* [Run project](#run-project)
* [Project structure](#project-structure)


## Visualization
![alt text](http://kaxi1993.github.io/images/projects/mern-template/todo.gif)

## Installation
```bash
npx mern-template my-app
```

or

```bash
npm install mern-template -g
mern-template my-app
```

## Run Project

```bash
cd my-app
npm install
npm start
```

or

```bash
cd my-app
docker-compose up
```

## Project Structure
```
|__ bin
|__ client
|__ config
|__ public
|__ server
|.. docker-compose.yml
|.. Dockerfile
|.. Dockerfile-development
|.. jest.config.js
|.. package.json
|.. process.json
|.. project.config.js
|.. webpack.common.js
|.. webpack.dev.js
|.. webpack.prod.js
```

### bin
bin folder contains file named `www` from where we start express server and connect to mongodb.

### config
I use [dotenv](https://github.com/motdotla/dotenv) to load environment variables. If NODE_ENV is development or test, environment variables are loaded from `config/.development` and `config/.test` files relatively. In production it is better to enter all your environment variables from console. It isn't good idea to upload environment variables on github.

### client
client folder contains `react` code. I use [redux](https://redux.js.org/) and [redux-saga](https://github.com/redux-saga/redux-saga) for state management,
[react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) to handle client side routing and [material-ui](https://material-ui.com/) as a UI framework. I use `scss` preprocessor with [bem](http://getbem.com/introduction/) methodology.

### public
public folder contains static assets.

### server

server side code has following structure:

```
|__ server
    |__ auth
    |__ tasks
    |__ users
    |.. app.js
    |.. db.js
    |.. routes.js
```

and each module looks like this:

```
|__ tasks
    |__ __tests__
    |.. index.js
    |.. task-controller.js
    |.. task-model.js
    |.. task-validation.js
```

I use [jest](https://jestjs.io/) for testing, [joi](https://www.npmjs.com/package/joi) for validation, [passport-jwt](https://www.npmjs.com/package/passport-jwt) for authentication, [mongoose](https://mongoosejs.com/) driver for mongodb and [signale](https://www.npmjs.com/package/signale) for logging.


## License
Copyright (c) 2019 Lasha Kakhidze. This code is released under the [MIT](https://github.com/kaxi1993/mern-template/blob/master/LICENSE) license.

***
