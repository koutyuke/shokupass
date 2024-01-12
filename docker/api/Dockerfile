ARG PORT=3001
ARG NODE_VERSION=18.18.2
ARG DISTROLESS_VERSION=18

FROM node:${NODE_VERSION}-bullseye AS Build

WORKDIR /shokupass

RUN npm install -g pnpm

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm api-contracts build && pnpm api prisma:migrate && pnpm api prisma:generate && pnpm api build

FROM gcr.io/distroless/nodejs:${DISTROLESS_VERSION} AS Run
ENV NODE_ENV=production

WORKDIR /shokupass

COPY --chown=nonroot:nonroot --from=Build /shokupass/node_modules ./node_modules
COPY --chown=nonroot:nonroot --from=Build /shokupass/apps/api/node_modules ./apps/api/node_modules
COPY --chown=nonroot:nonroot --from=Build /shokupass/apps/api/dist ./apps/api/dist
COPY --chown=nonroot:nonroot --from=Build /shokupass/packages/api-contracts/dist ./packages/api-contracts/dist
COPY --chown=nonroot:nonroot --from=Build /shokupass/packages/api-contracts/package.json ./packages/api-contracts/package.json

EXPOSE ${PORT}

USER nonroot
CMD ["apps/api/dist/src/main.js"]

