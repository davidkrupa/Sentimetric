/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, metadata } = event.data.object;

    const transaction = {
      stripeId: id,
      plan: metadata?.plan || "",
      buyerClerkId: metadata?.buyerClerkId || "",
      createdAt: new Date(),
    };

    // Create a new transaction in database here
    // const newTransaction = await createTransaction(transaction);

    // return NextResponse.json({ message: "OK", transaction: newTransaction });
    return NextResponse.json({ message: "OK" });
  }

  return new Response("", { status: 200 });
}
