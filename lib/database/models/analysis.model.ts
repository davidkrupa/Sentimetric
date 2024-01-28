import { Schema, model, models } from "mongoose";

const CustomAnalysisSchema = new Schema({
  topic: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  createdAt: { type: Date, default: Date.now },
});

const CustomAnalysis =
  models.CustomAnalysis || model("CustomAnalysis", CustomAnalysisSchema);

export default CustomAnalysis;
