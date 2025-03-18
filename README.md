# [Js & Node.js Foundation](https://react.dev) &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![npm version](https://img.shields.io/badge/npm-18.20.5-blue)](https://www.npmjs.com/package/node/v/18.20.5) [![nodemon](https://img.shields.io/badge/nodemon-3.1.9%20-brightgreen)](https://www.npmjs.com/package/nodemon) [![cron](https://img.shields.io/badge/cron-4.1.0-blue)](https://www.npmjs.com/package/cron)

## Content

1. Fundamentals: Basic JavaScript exercises.
2. Modern JavaScript: Introduction to ES6 features and unit testing with Jest.
3. TypeScript: Introduction to TypeScript.
4. Multiplication App: Console application that generates multiplication tables using command-line flags. Includes unit testing.
5. Monitoring Job: Periodic task that monitors an endpoint and logs the results.
6. JSON Server: Simple API using JSON Server to test the Monitoring Job project.

This repository contains all the code from the course [Node.js: From Scratch to Expert](https://cursos.devtalles.com/courses/nodejs-de-cero-a-experto) by Fernando Herrera. It is focused on laying the foundations of modern JavaScript for effective Node.js development.

---

## Notes

Before using any project, it is recommended to install dependencies:
  ```sh
  npm install
  ```
TypeScript is used to improve code quality and prevent errors.
Jest is used for unit testing.

### Example of Basic Commands in `package.json`
```json
"scripts": {
  "dev": "nodemon",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "build": "npm run test && rimraf ./dist && tsc",
  "start": "node dist/app.js"
}
```

To run any command, use npm run followed by the script name:
  ```sh
  npm run dev
  npm run test
  npm run test:watch
  npm build
  npm start
  ```

## Dependencies

Not every exercise includes all dependencies; this is a global reference.

- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Axios](https://www.npmjs.com/package/axios)
- [UUID](https://www.npmjs.com/package/uuid)
- [env-var](https://www.npmjs.com/package/env-var)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Jest](https://www.npmjs.com/package/jest)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [yargs](https://www.npmjs.com/package/yargs)
- [cron](https://www.npmjs.com/package/cron)
