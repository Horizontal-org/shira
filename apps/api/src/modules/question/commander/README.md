# Question Commander

CLI command for publishing demo questions from the Shira database to the Shira Library API.

## Setup

Add to your `.env`:

```
SHIRA_LIBRARY_URL=https://your-library-api-url
```

## Usage

```bash
npm run console:dev -- questions publish
```

The command will:
1. Query all `demo` questions from the DB and expand them by language
2. Compare against local state to find unpublished combinations
3. Show a per-line summary and ask for confirmation
4. Prompt for email/password to generate a JWT token
5. POST the batch to `SHIRA_LIBRARY_URL/questions/demo/batch`
6. Save the updated state to `demo-publish-state.json`

## State file

Published questions are tracked in `demo-publish-state.json` (gitignored) at the project root. Each entry stores the question ID and the language codes already published. Re-running the command will only publish new or untranslated questions.

To reset and republish everything, delete `demo-publish-state.json`.
