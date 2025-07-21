# events7-fe

## App sketches

App sketches where prepared using Excalidraw. Check and visit it here: [https://excalidraw.com/#room=6cc309affd237a5d9391,QwrN_5QHKwhf45BxIdHWFA](https://excalidraw.com/#room=6cc309affd237a5d9391,QwrN_5QHKwhf45BxIdHWFA).

## Project Setup

```sh
# clone git repository
git clone https://github.com/events7/events7-fe

# change directory
cd events7-fe

# install correct node version (if you haven't already)
nvm install $(cat .nvmrc)

# select correct node version
nvm use $(cat .nvmrc)

# install packages
npm install
```

### Pull git modules (shared repository)

```bash
npm run git:pull:shared
```

### Compile and Hot-Reload for Development

```sh
npm run start:dev
```

Visit the link from the console!

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

Check extracted files in [./dist](./dist/) folder.

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

## Usefull commands

To generate API types run

```bash
# generate types from docs.json openApi schema
npm run generate:types
```

## Assumptions

1. I assumed that there is no need for mobile version (it may work but is not perfect).

2. ...

## Stay in touch

- Author - [Goran Tubic](https://github.com/orangeGoran)

## License

This project is MIT.
