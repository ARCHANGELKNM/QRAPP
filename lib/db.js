// lib/db.js
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema"; // Import all exports
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'node:net';
const sql = neon(process.env.DATABASE_URL);

// Initialize Drizzle with the new staffProfiles table
export const db = drizzle(sql, { schema });
setDefaultAutoSelectFamilyAttemptTimeout(1000); 
