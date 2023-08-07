import { setupClickhouseDb } from "@loglib/setup";
import { createClient } from "@clickhouse/client";
import ora from "ora";

const client = createClient({
    host: process.env.CLICKHOUSE_HOST,
    password: process.env.CLICKHOUSE_PASSWORD,
});

const spinner = ora("Setting up clickhouse db").start();
setupClickhouseDb(client);
console.log("done setting up db");
spinner.stop();
