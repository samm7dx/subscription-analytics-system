import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readSql(relativePath) {
  const p = path.resolve(__dirname, "..", "..", relativePath);
  return await fs.readFile(p, "utf8");
}

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function main() {
  const host = requiredEnv("DB_HOST");
  const user = requiredEnv("DB_USER");
  const password = requiredEnv("DB_PASSWORD");
  const database = requiredEnv("DB_NAME");

  const schemaSql = await readSql("database/schema.sql");
  const sampleSql = await readSql("database/sample_data.sql");

  const conn = await mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true,
  });

  try {
    await conn.query(schemaSql);
    await conn.query(sampleSql);
    console.log("Demo DB reset complete.");
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
