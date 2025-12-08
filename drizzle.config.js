/** @type {import('drizzle-kit').Config} */
export default {
  schema: "./src/db/schema.js",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.'postgresql://neondb_owner:npg_oCmXFSxGBV16@ep-old-union-a44eg4vr-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
};
