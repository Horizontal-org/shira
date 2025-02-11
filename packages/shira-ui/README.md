# Shira UI

A shared UI component library for Shira's admin and public quiz applications. Built with React, TypeScript, and Storybook.

## Features

* Common React components designed for both admin and public interfaces
* Built with TypeScript for type safety
* Documented with Storybook for easy visualization and testing
* Easy to install and use in both applications

## Installation

```bash
yarn add @shira/ui
```

## Local Development

1. Install dependencies:
```bash
yarn
```

2. Run Storybook to view and develop components:
```bash
yarn storybook
```

3. Build the library:
```bash
yarn build
```

## Usage

```jsx
import { Button } from '@shira/ui'

function App() {
  return (
    <Button>Click me</Button>
  )
}
```

## Update library

1. Rebuild library
```
npm run build
```

2. update version in package.json
```
npm run build
```

3. Publish new version
```
npm publish --access public
```

4. In the consumer app, update to the new version:
```
yarn upgrade @shira/ui
```

## Contributing

1. Create a new component in `src/`
2. Add stories in a corresponding `.stories.tsx` file
3. Export the component in `src/index.ts`
4. Document usage and props