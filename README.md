# events7-fe

## App sketches

App sketches where prepared using Excalidraw. Check and visit it here: [https://excalidraw.com/#room=6cc309affd237a5d9391,QwrN_5QHKwhf45BxIdHWFA](https://excalidraw.com/#room=6cc309affd237a5d9391,QwrN_5QHKwhf45BxIdHWFA).

## Project Setup

```sh
npm install
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

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

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

## Generate API types

To generate API types run

```bash
# generate types from docs.json openApi schema
npm run generate:types
```

## Assumptions

1. ...

## Stay in touch

- Author - [Goran Tubic](https://github.com/orangeGoran)

## License

This project is MIT.
