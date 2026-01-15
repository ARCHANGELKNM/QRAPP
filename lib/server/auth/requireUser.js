import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function requireUser() {
  const session = getKindeServerSession();
  const user = await session.getUser();

  if (!user || !user.id) {
    throw new Error("UNAUTHENTICATED");
  }

  return {
    kindeUserId: user.id,
    email: user.email ?? null,
    firstName: user.given_name ?? null,
    lastName: user.family_name ?? null,
  };
}
