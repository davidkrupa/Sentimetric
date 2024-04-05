import { Schema, model, models } from "mongoose";

const ActivitiesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  action: { type: String, required: true },
  total: { type: Number, required: true, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Activities = models.Activities || model("Activities", ActivitiesSchema);

export default Activities;
