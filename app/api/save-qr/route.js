

import { getXataClient } from "@src/xata"; // Adjust path if needed
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const xata = getXataClient();

export async function POST(request) {

  try {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const UserName = `${user.given_name} `;
    const UserId = `${user.family_name}`
    const body = await request.json();
    console.log("Received body:", body);

    const { qrData } = body;

    const record = await xata.db.qrcode_info.create({
      UserId: UserId,
      Name:  UserName,
      qrContent: JSON.stringify({ qrData }),
    });

    console.log("Record saved:", record);

    return new Response(JSON.stringify({ success: true, record }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error in save-qr API:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
