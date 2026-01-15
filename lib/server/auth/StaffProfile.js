import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getStaffProfile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) return null;

  const [profile] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, user.id))
    .limit(1);

  return profile ?? null;
}
