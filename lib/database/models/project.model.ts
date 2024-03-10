import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  topic: { type: String, required: true },
  content: { type: String, default: "" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
