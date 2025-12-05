import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const qrCodes = pgTable("qr_codes", {
  id: serial("id").primaryKey(),
  data: varchar("data", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scanHistory = pgTable("scan_history", {
  id: serial("id").primaryKey(),
  qrId: varchar("qr_id", { length: 50 }),
  scannedAt: timestamp("scanned_at").defaultNow(),
});
