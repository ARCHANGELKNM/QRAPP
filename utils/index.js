import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "sql204.infinityfree.com",
  user: "if0_38896595",
  database: "if0_38896595_db_qrappdatabase",
  password: "ZnTHYUCvQj1gtEc",
  port: "3306", 
});

const db = drizzle({ client: connection });

