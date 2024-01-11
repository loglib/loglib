# Contributing

We really appreciate any kind of contribution regardless of your coding skills. We believe loglib should be really easy for anyone who wants to get into contributing to open-source projects. So if this is your first-time contribution we'd love to support you in any way to get in there. Read the above instructions to get the project overview better.

## Main Tech Stack Used Currently

- Language - [Typescript](https://www.typescriptlang.org)
- Metaframework - [Next JS App Router](https://nextjs.org) (with [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations))
- Styling - [Tailwind](https://tailwindcss.com), [Shadcn](https://ui.shadcn.com), [Radix](https://www.radix-ui.com)
- State Management - [Jotai](https://jotai.org/), [SWR](https://swr.vercel.app)
- Authentication - [Next-Auth](https://next-auth.js.org)
- API Framework - [Hono JS](https://hono.dev)
- Markdown - [Contentlayer](https://contentlayer.dev)
- Databases - [Drizzle ORM](https://orm.drizzle.team), Local Sqlite Database For development and [Turso](https://turso.tech) (libsql on edge) for production, [Clickhouse](https://clickhouse.com) (OLAP Database) for analytics data
- Emails - [Resend](https://resend.com)

## Folder Structure

We use [Turbo-repo](https://turbo.build) to manage the project. If you're not familiar with turbo repo skim through the docs the basic will be enough for most tasks.

1. Apps - Contains two other folders: API (Hono js API that serves as API for analytics data and to receive data from the tracker) and www/web (Next js app router project that serves as the main application framework)

2. Packages - Contains shared packages across the two apps and published tracker npm package.

## Setting up loglib for development

### Basics

- **Step 1**: Clone or fork the repo
- **Step 2**: Run `pnpm install` on the root
- **Step 3**: Run `pnpm build` (to build packages)
- **Step 4**: Set environment variables respectively and populate the values.

> Make sure you set similar NEXT_AUTH_SECRET on both API and www. You can run `openssl rand -base64 64` to generate a good jwt secret.

> You also need either **Github** or **Google** auth in order to login. So make sure to set at least one of those.

```sh-session
cp .env.example .env
```

### Setting up database

We really want loglib to be easy for everyone who want to contribute and use in their own development setup. We've worked hard to make sure you don't have to sign up for external services or deal with complicated Docker setups that can slow down your pc. All you need is a basic sqlite database to run loglib.

**Step 1**: Migrate the schema and setup local database

```sh-session
pnpm migrate
```

This will create a sqlite database in packages/db folder that'll be used across the whole project including as a clickhouse queries if you don't provide clickhouse credentials.

> Even though this is viable for development for production you need a turso db instance.

**Step 2** (optional): Setting up clickhouse
Run clickhouse in docker using this command.

```sh-session
docker run -d --name clickhouse-server -p 8123:8123 --ulimit nofile=262144:262144 yandex/clickhouse-server
```

Now let's migrate our schema to clickhouse

```sh-session
pnpm db clickhouse:migrate
```

That's it! now you can run loglib for dev environment with

```
pnpm dev
```

> Please open an issue or a PR if this contribution guide isn't working anymore for your setup or if you think we should update it for some reason.
