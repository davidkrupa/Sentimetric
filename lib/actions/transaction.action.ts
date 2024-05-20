"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs";

import { TransactionModes } from "@/types";

const priceId = {
  subscription:
    process.env.ENV_NODE === "development"
      ? process.env.TEST_SUBSCRIPTION_PRICE_ID
      : "",
  payment:
    process.env.ENV_NODE === "development"
      ? process.env.TEST_LIFETIME_PAYMENT_PRICE_ID
      : "",
};

export async function checkoutPayment(transactionMode: TransactionModes) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { userId }: { userId: string | null } = auth();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId[transactionMode],
        quantity: 1,
      },
    ],
    metadata: {
      buyerClerkId: userId || "",
    },
    mode: transactionMode,
    success_url:
      process.env.ENV_NODE === "development"
        ? "http://localhost:3000/dashboard"
        : `${process.env.PRODUCTION_BASE_URL}/dashboard`,
    cancel_url:
      process.env.ENV_NODE === "development"
        ? "http://localhost:3000"
        : process.env.PRODUCTION_BASE_URL,
  });

  redirect(session.url!);
}
