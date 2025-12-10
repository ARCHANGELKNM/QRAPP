import {
  pgTable,
  text,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

// INSTITUTIONS Table (Master list of schools)
export const institutions = pgTable("institutions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

// Renaming 'profiles' to 'staff_profiles' for clarity, focusing purely on system operators
export const staffProfiles = pgTable("staff_profiles", {
  id: serial("id").primaryKey(), // Internal Drizzle ID
  // CRITICAL: Unique ID supplied by Kinde for relational joins
  kindeUserId: varchar("kinde_user_id", { length: 255 }).notNull().unique(),

  name: text("name"),
  surname: text("surname"),
  // Legacy free-form institution name (kept for compatibility)
  institution: text("institution"),
  // Scoped institution reference for sub-admins / approvals
  institutionId: integer("institution_id").references(() => institutions.id),

  email: text("email").notNull().unique(),

  // Roles: teacher (default), subadmin (scoped), admin (global)
  role: varchar("role", { length: 50 }).default("teacher").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

// QR CODES History (Logs generated student codes)
export const qrCodes = pgTable("qr_codes", {
  id: serial("id").primaryKey(),
  // Links history item back to the staff member who generated it
  userId: varchar("user_id", { length: 255 }).notNull(),
  content: text("content").notNull(), // The final string encoded in the QR code (Name, Surname, Grade, Institution)
  createdAt: timestamp("created_at").defaultNow(),
});

// IMPORTANT: The previous 'users' table definition is removed entirely.
