

import { getXataClient } from "@src/xata"; // Adjust path if needed
const xata = getXataClient();

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { userName , qrData } = body;

    const record = await xata.db.qrcode_info .create({
     
      userName,
      qrContent: JSON.stringify({qrData}),
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
