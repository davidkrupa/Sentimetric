import { Schema, model, models } from "mongoose";

const CompanySummarySchema = new Schema({
  content: { type: String, default: "" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  createdAt: { type: Date, default: Date.now },
});

const CompanySummary =
  models.CompanySummary || model("CompanySummary", CompanySummarySchema);

export default CompanySummary;
