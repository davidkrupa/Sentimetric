import { Schema, model, models } from "mongoose";

const ActivitiesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  lastActivity: {
    type: {
      skill: { type: String },
      name: { type: String },
    },
    default: {},
  },
  history: [
    {
      type: {
        name: { type: String },
        total: { type: Number },
        date: { type: Date },
      },
    },
  ],
  statistics: [
    {
      type: {
        total: { type: String },
        date: { type: Date },
      },
    },
  ],
});

const Activities = models.Activities || model("Activities", ActivitiesSchema);

export default Activities;
