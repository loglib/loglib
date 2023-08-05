# Contributing

Thank you for your interest in contributing to loglib! We welcome contributions from anyone, regardless of their level of experience or background.

### Services

There are a few 3rd party services that are required to run the app:

- [Planetscale](https://planetscale.com?ref=loglib): Database
- [Upstash/Redis](https://upstash.com?ref=loglib): Rate Limiting

You will need to set environment variables in /apps/www/.env and/or /apps/api/.env respectively and populate the values from the services above. You can use the following commands to copy the example files:

```sh-session
cp apps/www/.env.example apps/web/.env
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

### 0. Install

```sh-session
pnpm install
```

### 1. Prepare databases

Push the database schema to Planetscale:

```sh-session
cd apps/www
pnpm prisma db push
```

## Build

```sh-session
pnpm build
```

## Run API

Add a `.env` file in `/apps/api/.env` and populate the values from the services above.

```sh-session
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

Then run the api:

```sh-session
pnpm turbo run dev --filter=api
```

## Run app

```sh-session
pnpm turbo run dev --filter=web
```
