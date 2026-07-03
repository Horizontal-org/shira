# Shira Spaces

`apps/spaces` is the internal frontend for managing quizzes, questions, learners, organizations, and related workspace flows.

## Prerequisites

- Node.js and npm
- A running API on `http://localhost:3000` for local development
- Access to the library API used for quiz and question templates

## Environment

Copy the example file:

```sh
cp .env.example .env
```

## Local Development

From the repo root, install dependencies and start the workspace:

```sh
npm install
npm run dev
```

If you only want this app, run from `apps/spaces`:

```sh
npm run dev
```

The app runs on `http://localhost:3002`.

## Common Commands

```sh
npm run dev
npm run build
npm run test
```

## Deployment

Frontend builds are triggered from the repo root with:

```sh
npm run deploy-frontend
```
