import { Schema, model, models } from "mongoose";

const IdeasSchema = new Schema({
  content: { type: String, required: true },
  projects: [{ type: String }],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Ideas = models.Ideas || model("Ideas", IdeasSchema);

export default Ideas;
