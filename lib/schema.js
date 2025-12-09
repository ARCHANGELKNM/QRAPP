import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

// INSTITUTIONS
export const institutions = pgTable("institutions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

// USERS
export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  surname: varchar("surname", { length: 255 }).notNull(),
  grade: varchar("grade", { length: 50 }).notNull(),

  institution: varchar("institution", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  createdAt: timestamp("created_at").defaultNow(),
});

// QR CODE HISTORY
export const qrHistory = pgTable("qr_history", {
  id: serial("id").primaryKey(),

  userId: varchar("user_id", { length: 255 }).notNull(), // Kinde user ID
  content: text("content").notNull(), // final QR string

  createdAt: timestamp("created_at").defaultNow(),
});
