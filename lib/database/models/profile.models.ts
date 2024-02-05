import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  industry: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  currentAnalysis: {
    type: Schema.Types.ObjectId,
    ref: "Analysis",
    default: null,
  },
});

const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;
