import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { staffProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function RequireAuth(req, body) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  
  // ✅ 1. Wait for the boolean check (Fixes the 401)
  if (!(await isAuthenticated())) {
    return { error: "Unauthorized", status: 401 };
  }

  // ✅ 2. Await the actual user object
  const user = await getUser();
  if (!user?.id) {
    return { error: "User ID not found", status: 401 };
  }

  const institution_id = body?.institution_id || body?.institutionId;
  if (!institution_id) {
    return { error: "Institution ID required", status: 400 };
  }

  // ✅ 3. Query using your schema's 'kindeUserId' key
  const [existing] = await db
    .select()
    .from(staffProfiles)
    .where(eq(staffProfiles.kindeUserId, user.id))
    .limit(1);

  return {
    user,
    existing: existing || null,
    institution_id: Number(institution_id)
  };
}
