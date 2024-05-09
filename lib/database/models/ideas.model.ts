import { Schema, model, models } from "mongoose";

const IdeasSchema = new Schema({
  content: { type: String, required: true },
  formatted: [
    {
      title: { type: String, required: true },
      explanation: { type: String, required: true },
      index: { type: Number, required: true },
    },
  ],
  pickedFormattedIds: [
    {
      index: { type: Number, required: true },
      formatted: {
        type: Schema.Types.ObjectId,
        ref: "Ideas.formatted",
        default: null,
      },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Ideas = models.Ideas || model("Ideas", IdeasSchema);

export default Ideas;
