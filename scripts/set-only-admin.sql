-- Helper SQL: make only a single Kinde user the admin
-- Replace values and run in your DB console

BEGIN;

CREATE TABLE IF NOT EXISTS staff_profiles_backup AS TABLE staff_profiles WITH NO DATA;
INSERT INTO staff_profiles_backup SELECT * FROM staff_profiles;

-- Revoke admin from others
UPDATE staff_profiles SET role = 'teacher' WHERE role = 'admin' AND kinde_user_id <> '<YOUR_KINDE_USER_ID>';

-- Upsert your admin row
INSERT INTO staff_profiles (kinde_user_id, name, email, role)
VALUES ('<YOUR_KINDE_USER_ID>', '<Your Name>', '<you@example.com>', 'admin')
ON CONFLICT (kinde_user_id) DO UPDATE SET role = 'admin', name = EXCLUDED.name, email = EXCLUDED.email;

COMMIT;
