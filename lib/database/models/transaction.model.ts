import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  buyerClerkId: { type: String, required: true },
  stripeId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
