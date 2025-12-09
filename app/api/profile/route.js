// app/api/profile/route.js
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db"; // your drizzle connection
import { users } from "@/lib/schema"; // your user table

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();

    if (!authUser || !authUser.email) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userRecord = await db
      .select()
      .from(users)
      .where(users.Email.eq(authUser.email))
      .limit(1);

    if (!userRecord.length) {
      return Response.json({ error: "User not found in DB" }, { status: 404 });
    }

    return Response.json(userRecord[0], { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
