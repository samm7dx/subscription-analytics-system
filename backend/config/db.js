const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load backend/.env for local dev (ignored on Render — platform injects env vars)
dotenv.config({ path: path.join(__dirname, "..", ".env") });

/**
 * Resolve DB settings. Code expects DB_* names (see backend/.env.example).
 * Aiven/Railway dashboards often expose MYSQL_* — we accept those as fallbacks.
 */
const resolveDbEnv = () => {
  const host =
    process.env.DB_HOST ||
    process.env.MYSQL_HOST ||
    process.env.MYSQLHOST;

  const user =
    process.env.DB_USER ||
    process.env.MYSQL_USER ||
    process.env.MYSQLUSER;

  const password =
    process.env.DB_PASSWORD ??
    process.env.MYSQL_PASSWORD ??
    process.env.MYSQLPASSWORD ??
    "";

  const database =
    process.env.DB_NAME ||
    process.env.MYSQL_DATABASE ||
    process.env.MYSQLDATABASE;

  const port = Number(
    process.env.DB_PORT ||
      process.env.MYSQL_PORT ||
      process.env.MYSQLPORT ||
      3306
  );

  const sslFlag = (
    process.env.DB_SSL ||
    process.env.MYSQL_SSL ||
    ""
  ).toLowerCase();

  const useSsl =
    sslFlag === "true" ||
    sslFlag === "1" ||
    sslFlag === "required";

  return { host, user, password, database, port, useSsl };
};

const logMissingEnv = (config) => {
  const missing = [];
  if (!config.host) missing.push("DB_HOST (or MYSQL_HOST)");
  if (!config.user) missing.push("DB_USER (or MYSQL_USER)");
  if (config.password === undefined || config.password === null)
    missing.push("DB_PASSWORD (or MYSQL_PASSWORD)");
  if (!config.database) missing.push("DB_NAME (or MYSQL_DATABASE)");

  if (missing.length > 0) {
    console.error(
      "[db] Missing required environment variables:",
      missing.join(", ")
    );
    console.error(
      "[db] On Render: Dashboard → Environment → set DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_SSL=true for Aiven."
    );
    console.error(
      "[db] If Aiven shows MYSQL_USER, either copy the value into DB_USER or use the MYSQL_* names (supported as fallback)."
    );
  }
};

const buildPoolConfig = () => {
  const connectionUrl =
    process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.MYSQL_URI;

  if (connectionUrl) {
    const useSslFromUrl = resolveDbEnv().useSsl;
    return {
      uri: connectionUrl,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      ssl: useSslFromUrl ? { rejectUnauthorized: false } : undefined,
    };
  }

  const config = resolveDbEnv();
  logMissingEnv(config);

  return {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: config.useSsl ? { rejectUnauthorized: false } : undefined,
  };
};

const pool = mysql.createPool(buildPoolConfig());

pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    if (err.message.includes("Access denied for user ''")) {
      console.error(
        "[db] Empty username detected — DB_USER is not set on this host. Fix Render/Aiven env var names."
      );
    }
    return;
  }
  console.log("MySQL connected successfully");
  connection.release();
});

module.exports = pool;
