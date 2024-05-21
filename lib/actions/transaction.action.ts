"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";

import { CreateTransactionParams, TransactionModes } from "@/types";
import { connectToDatabase } from "../database";
import Transaction from "../database/models/transaction.model";
import { handleError } from "../utils";
import { getCurrentUser } from "./user.actions";

const priceId = {
  subscription:
    process.env.ENV_NODE === "development"
      ? process.env.TEST_SUBSCRIPTION_PRICE_ID
      : process.env.REAL_SUBSCRIPTION_PRICE_ID,
  payment:
    process.env.ENV_NODE === "development"
      ? process.env.TEST_LIFETIME_PAYMENT_PRICE_ID
      : process.env.REAL_LIFETIME_PAYMENT_PRICE_ID,
};

export async function checkoutPayment(
  transactionMode: TransactionModes,
  userId: string | null
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    console.log("TRANSACTION CALLED");

    const user = await getCurrentUser();

    const newTransaction = await Transaction.create({
      ...transaction,
      userId: user._id,
    });

    console.log("TRANSACTION CREATED: ", newTransaction);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}
