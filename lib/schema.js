import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

/* =========================
   INSTITUTIONS
   ========================= */
export const institutions = pgTable("institutions", {
  id: integer("id")
    .primaryKey()
    .generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull().unique(),
});

/* =========================
   STAFF PROFILES
   ========================= */
export const staffProfiles = pgTable("staff_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),

  kindeUserId: varchar("kinde_user_id", { length: 255 })
    .notNull()
    .unique(),

  name: varchar("name", { length: 100 }).notNull(),
  surname: varchar("surname", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),

  role: varchar("role", { length: 50 })
    .notNull()
    .default("user"), // admin | subadmin | user

  institutionId: integer("institution_id")
    .references(() => institutions.id),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   QR CODES
   ========================= */
export const qrCodes = pgTable("qr_codes", {
  id: uuid("id").defaultRandom().primaryKey(),

  content: text("content").notNull(),

  // Kinde identity (STRING, NOT UUID)
  generatedByKindeId: text("generated_by_kinde_id"),
  generatedByName: text("generated_by_name"),

  // Institution snapshot
  institutionName: text("institution_name"),

  createdAt: timestamp("created_at").defaultNow(),
});
