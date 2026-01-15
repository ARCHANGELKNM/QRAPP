import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function requireAuth() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      ok: false,
      status: 401,
      error: "Unauthorized",
    };
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email || null,
      name: user.given_name || null,
      surname: user.family_name || null,
    },
  };
}
