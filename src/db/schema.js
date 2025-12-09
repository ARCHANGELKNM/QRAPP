import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Institution table
export const institutions = pgTable("institutions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  institutionId: uuid("institution_id").references(() => institutions.id),
});

// QR Codes table
export const qrCodes = pgTable("qr_codes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: uuid("user_id").references(() => users.id),
  institutionId: uuid("institution_id").references(() => institutions.id),
  createdAt: timestamp("created_at").defaultNow(),
});
