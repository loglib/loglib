# Contributing

We really appericate any kind of contibution regardless of your coding skills. We beleive loglib should be really easy for anyone who wants to get into contributing for open source projects. So if this your first time conctribution we'd love to support you in anyway to get in there. Read the above instruction to get the project overview better.

## Main Tech Stack Used Currently

- Language - Typescript
- Metaframework - Next JS App Route (with server actions)
- Styling - Tailwind, Shadcn, Radix
- State Mangement - Jotai, SWR
- Authentication - Nextauth
- API Framework - Hono JS
- Markdown - Contentlayer
- Databases - Drizzle ORM, Local Sqlite Database For developement and turso (libsql on edge) for porduction, Clickhouse (OLAP Database) for analytics data
- Emails - Resend

## Folder Structure

We use turporepo to manage the project. If you're not familar with turbo repo skim through the docs the basic will be enough for most tasks.

1. Apps - Contains two other folders: api(hono js api that serves as api for analytics data and to recive data from the tracker) and www/web(next js app route project that serve as the main application framework)

2. Packgaes - Contains shared packages across the two apps and published tracker npm package.

## Setting up loglib for development

### Basics

**Step 1**: Clone or fork the repo
**Step 2**: Run pnpm install on the root
**Step 3**: Run pnpm build (to build packages)

### Setting up databse

With our passion to make loglib very easy to contibute and run in dev environment we made sure you can run most of loglib without needing to signup for 3rd party service or run a docker instance that hogs up your memory. All you need is a sqlite database to run loglib.

**Step 1**: Migrate the shcema and setup local database

```sh-session
pnpm db migrate
```

this will crate a sqlite database in packages/db folder that'll be used across the whole project including as a clickhouse queries if you don't provide clickhouse crentials.

**Step 2**: Setting up clickhouse (optional)
Run clickhouse in docker using this command.

```sh-session
docker run -d --name clickhouse-server -p 8123:8123 --ulimit nofile=262144:262144 yandex/clickhouse-server
```

Now we haven't setup our env variables to this point so first let's change .env.example to .env on both apps (web and api).

Then make sure to add your locally running clickhouse credentials there.

Now let's migrate our schema to clickhouse

```sh-session
pnpm db migrate:clickhouse
```

That's it! now you can run loglib for dev enviroment with

```
pnpm dev
```

> Please open an issue or a pr if this contribtuion guide isn't working anymore for your setup or if you think we should update it for some reason.
