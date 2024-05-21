import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  buyerClerkId: { type: String, required: true },
  stripeId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
