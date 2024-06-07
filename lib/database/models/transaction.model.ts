import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  buyerClerkId: { type: String, required: true },
  stripeId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  model: { type: String, required: true },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
