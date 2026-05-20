# Shira UI

A shared UI component library for Shira's admin and public quiz applications. Built with React, TypeScript, and Storybook.

## Features

- Common React components designed for both admin and public interfaces
- Built with TypeScript for type safety
- Documented with Storybook for easy visualization and testing
- Published as a public npm package under `@horizontal-org/shira-ui`

## Installation

```bash
npm install @horizontal-org/shira-ui
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
import { Button } from "@horizontal-org/shira-ui";

function App() {
  return <Button>Click me</Button>;
}
```

## Release a new version

> remember that for publishing you need to have set up your access token in the proyect parent .npmrc
> in our case even if all the commands need to be run in ~/shira/package/shira-ui is very likely that the `.npmrc` that npm grabs when trying to publish is the one in ~/shira

here is an example of the contents of `.npmrc` :

```
//registry.npmjs.org/:_authToken=npm_yourtoken
```

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
npm install @horizontal-org/shira-ui@<version>
```

## Contributing

1. Create a new component in `src/`
2. Add stories in a corresponding `.stories.tsx` file
3. Export the component in `src/index.ts`
4. Document usage and props
