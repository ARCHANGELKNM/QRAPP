-- Migration: add institution_id to staff_profiles so sub-admins can be scoped to an institution
-- Run this in your database after taking a backup/snapshot

BEGIN;

-- Optional backup inside DB
CREATE TABLE IF NOT EXISTS staff_profiles_backup AS TABLE staff_profiles WITH NO DATA;
INSERT INTO staff_profiles_backup SELECT * FROM staff_profiles;

-- Add institution_id column (integer, nullable)
ALTER TABLE staff_profiles
  ADD COLUMN IF NOT EXISTS institution_id integer;

-- Add FK to institutions(id) if institutions uses serial integer ids
ALTER TABLE staff_profiles
  ADD CONSTRAINT IF NOT EXISTS fk_staff_profiles_institution
  FOREIGN KEY (institution_id) REFERENCES institutions(id);

COMMIT;

-- After running, consider running ANALYZE on the table and testing in dev.
