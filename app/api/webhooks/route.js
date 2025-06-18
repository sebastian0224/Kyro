import { verifyWebhook } from "@clerk/nextjs/webhooks";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      await prisma.user.create({
        data: {
          id,
          email: email_addresses[0]?.email_address || "",
          name: `${first_name || ""} ${last_name || ""}`.trim(),
          avatarUrl: image_url,
          plan: "free", // valor por defecto
        },
      });
    }

    if (eventType === "user.updated") {
      await prisma.user.update({
        where: { clerkId },
        data: {
          email: email_addresses[0]?.email_address || "",
          name: `${first_name || ""} ${last_name || ""}`.trim(),
          avatarUrl: image_url,
        },
      });
    }

    if (eventType === "user.deleted") {
      await prisma.user.delete({
        where: { clerkId },
      });
    }

    console.log(`✅ Webhook processed: ${eventType} for user ${clerkId}`);
    return new Response("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("❌ Error processing webhook:", err);
    return new Response("Webhook error", { status: 400 });
  }
}
