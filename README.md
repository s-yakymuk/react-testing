# React Testing Examples

This repository provides an example of testing setup for React applications.

The following libraries are used:

- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [vitest-review](https://www.vitest-preview.com/)
- [Mock Service Worker](https://mswjs.io/)

## Start application locally

To start a local back end API execute the following commands in your terminal:

```
npm run server
```

API will be available at http://localhost:3000/, you can change the dataset by editing `./src/server/db.json` file.

To start client application (available at http://localhost:3000/) please execute:

```
npm run dev
```

**Both client and server apps should be running to use application locally!**

## Testing (default mode)

```
npm run test
```

Runs all of the available tests, showing results in the terminal. Runs in watch mode by default, waiting for the code changes to re-run the tests.

## Testing (UI mode)

```
npm run test:ui
```

Starts a local web server at http://localhost:51204/**vitest**/#/ with a user-friendly UI that allows manual interaction with the test suite

## Testing (coverage)

```
npm run coverage
```

Generates coverage report available at `./coverage/index.html`

## Vitest Preview

```
npm run vitest-preview
```

Previews are avaliable at http://localhost:5006/

```js
import { debug } from 'vitest-preview';

// Inside your tests
describe('my test', () => {
  render(<MyComponent />);
  debug(); // 👈 Add this line
}
```
