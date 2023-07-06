# WICM

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

## Cluster orchestration

Docker swarm does all the job in scheduling,updating and removing services. The REST [API](https://github.com/rmvs/wicm-api) is responsible for authentication and authorization as well as cluster management through the remote docker daemon socket.

The configuration as described [here](./docs/Web%20Interface%20for%20Container%20Management%20-%20Release%203.pdf) consists of 3 worker nodes and 1 master.

## Routing and Load Balancing

Traefik is used as primary API Gateway to route traffic in addition to load balancing. Docker Swarm offers autoscaling of tasks across the workers.

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
DOCKER_HOST=
BASE_URL=
API_URL=
SECRET=
```

You can use the default docker socket in the variable ```DOCKER_HOST``` (tcp://127.0.0.1:2375). Configure the ```API_URL``` as an URL that points to the project [API](https://github.com/rmvs/wicm-api).

## References

- [Protect Docker Daemon Socket](https://docs.docker.com/engine/security/protect-access/)
- [Swarm Mode Overview](https://docs.docker.com/engine/swarm/)
- [Configuring Traefik in Swarm Mode](https://doc.traefik.io/traefik/v1.7/user-guide/swarm-mode/)
- [Scaling Web Apps](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)
