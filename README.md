# [TI0080] WICM

WICM stands for Web Interface for Container Management. Its primary goal is to expose a web interface for [container](https://cloud.google.com/learn/what-are-containers) management using [docker](https://docs.docker.com/get-started/overview/) as backend for application service creation.
There are other tools known for this kind of task. This is an experimental project that aims to use [IaC](https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac) tools and to cover common aspects of web application development for academic purposes.

You can get an overview [here](./docs/Web%20Interface%20for%20Container%20Management%20-%20Release%203.pdf).

## Web tier

This project was made using Node.js + Express.js for server side rendering. Webpack bundles all server code (views, styles, and modules) in a single file.

- This app makes uses of [Prisma](https://github.com/prisma/prisma) ORM for persiting user data.
- All session data are memory-based.
- [Twig.js](https://github.com/twigjs/twig.js/) is used as a template engine

## Client tier

Webpack exposes a global variable called "app" that can be acessed throughout the views. It acts as a single point for calling functions in the client side.
You can view client code is located [here](./src/client/). This projects makes use of [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) as an utility library for creating richer interfaces.

You can install dependencies using

```sh
npm install
```

To build this project

```sh
npm run build
```

or

```sh
yarn build
```

To run this application:

```sh
npm run watch
```

You need to configure a session secret in the .env file before running this app

```sh
SESSION_SECRET=
```


## Things to work in the next release

- Create a clear directory structure for client and server code.
- Make REST API calls (this is where IaC comes to action ⚡)
- Prepare for production mode 🚀
