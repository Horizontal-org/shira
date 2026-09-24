FROM node:22-bookworm-slim

WORKDIR /workspace

# Cache Linux dependencies separately from application source changes.
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/public/package.json ./apps/public/package.json
COPY apps/spaces/package.json ./apps/spaces/package.json
COPY packages/shira-ui/package.json ./packages/shira-ui/package.json
COPY packages/tooling-config/package.json ./packages/tooling-config/package.json
RUN npm ci --workspace api --include-workspace-root=false --no-audit --no-fund

COPY apps/api ./apps/api
COPY e2e/start-api.ts e2e/start-server.js e2e/environment.js ./e2e/

WORKDIR /workspace/apps/api
EXPOSE 3000
CMD ["node", "../../e2e/start-server.js", "api"]
