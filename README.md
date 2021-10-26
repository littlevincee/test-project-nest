# Test App Backend Quick Start

Test App Backend uses [Nest](https://github.com/nestjs/nest) framework and it is dockerised.

## Prequisite

Open these files to make sure it is using `LF`, the end of line sequence:

1. wait-for-it.sh - the usage of this file is to wait until the mongodb is up and running before starting the `test-app-nest` container
2. start.sh - kick start the `test-app-nest` backend

Run `yarn install` then `yarn build` before trying to host the backend app in docker

## Running the app dockerised

```bash
1. build the docker image
$ docker build -t test-app-nest-image:master .

2. run docker image
$ docker-compose up -d
```

Once docker is up and running it can be can be accessed via e.g. `localhost:3001/api/{controller}`

## Running the app locally

### Perquisite

The backend app uses mongodb therefore you have two option:

1. Installl mongodb locally and do not set any root username and root password. Otherwise, you need to modify the connection string in `src/shared/service/MongooseConfigService.ts`
2. If docker is install then you can simply run `docker-compose -f docker-compose.dev.yml up -d` to host the mongodb

### Installation

```bash
$ yarn install
```

```bash
# development
$ yarn run start

# watch mode
$ yarn start:dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod
```