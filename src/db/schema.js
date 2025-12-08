import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const institutions = pgTable("institutions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email"),
  institutionId: integer("institution_id")
    .references(() => institutions.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const qrCodes = pgTable("qr_codes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  institutionId: integer("institution_id")
    .references(() => institutions.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
