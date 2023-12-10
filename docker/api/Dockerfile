ARG PORT
ARG NODE_VERSION
ARG DISTROLESS_VERSION

FROM node:${NODE_VERSION}-bullseye AS Build

WORKDIR /shokupass

RUN npm install -g pnpm

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @shokupass/api turbo build

FROM gcr.io/distroless/nodejs:${DISTROLESS_VERSION} AS Run
ENV NODE_ENV=production

WORKDIR /shokupass

COPY --chown=nonroot:nonroot --from=Build /shokupass/node_modules ./node_modules
COPY --chown=nonroot:nonroot --from=Build /shokupass/apps/api/node_modules ./apps/api/node_modules
COPY --chown=nonroot:nonroot --from=Build /shokupass/apps/api/dist ./apps/api/dist

EXPOSE 3000

USER nonroot
CMD ["apps/api/dist/src/main.js"]

