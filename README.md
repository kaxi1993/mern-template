# mern-template

[![npm version](https://badge.fury.io/js/mern-template.svg)](https://badge.fury.io/js/mern-template)
[![npm](https://img.shields.io/npm/dt/mern-template.svg?maxAge=2592000)](https://www.npmjs.com/package/mern-template)

**mern-temlate** is a cli tool for generating isomorphic and modular mongo, express, react and node web app. The project is based on the best practices and popular tools. This is not just a simple starter which generates folder structure only, but a real example of production ready todolist web application.

## Table of contents
* [Visualization](#visualization)
* [Installation](#installation)
* [Run project](#run-project)
* [File structure](#file-structure)


## Visualization
![alt text](http://kaxi1993.github.io/images/npm/mern-template/todo.gif)

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

## File Structure
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
folder contains file named `www` from where we start express server and connect to mongodb

### config

## License
Copyright (c) 2019 Lasha Kakhidze. This code is released under the [MIT](https://github.com/kaxi1993/mern-template/blob/master/LICENSE) license.

***
