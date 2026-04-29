# Shira UI

A shared UI component library for Shira's admin and public quiz applications. Built with React, TypeScript, and Storybook.

## Features

- Common React components designed for both admin and public interfaces
- Built with TypeScript for type safety
- Documented with Storybook for easy visualization and testing
- Published as a public npm package under `@shira/ui`

## Installation

```bash
npm install @shira/ui
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run Storybook to view and develop components:

```bash
npm run storybook
```

3. Build the library:

```bash
npm run build
```

4. Validate the publish tarball:

```bash
npm run pack:check
```

## Usage

```jsx
import { Button } from "@shira/ui";
import "@shira/ui/styles.css";

function App() {
  return <Button>Click me</Button>;
}
```

## Release a new version

1. Bump the version in `packages/shira-ui/package.json`.
2. Build and verify the package:

```bash
npm run build
npm run pack:check
```

3. Publish with an npm account that can publish to the `@shira` scope:

```bash
npm publish --access public
```

4. In the consumer app, install or update the new version:

```bash
npm install @shira/ui@<version>
```

## Contributing

1. Create a new component in `src/`
2. Add stories in a corresponding `.stories.tsx` file
3. Export the component in `src/index.ts`
4. Document usage and props
