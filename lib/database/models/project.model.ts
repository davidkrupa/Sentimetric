import { Schema, model, models } from "mongoose";

const ProjectSectionSchema = new Schema({
  topic: { type: String, required: true },
  content: { type: String, default: "" },
  section: {
    name: {
      type: String,
      required: true,
      enum: ["introduction", "projectIdea", "about", "conclusion"],
    },
    refKeyword: { type: String },
    schemaId: { type: Schema.Types.ObjectId, refPath: "section.refKeyword" },
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProjectSection =
  models.ProjectSection || model("ProjectSection", ProjectSectionSchema);

export default ProjectSection;
