import { Schema, model, models } from "mongoose";

const JobSkillsSchema = new Schema({
  hardSkills: [{ type: String }],
  softSkills: [{ type: String }],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
});

const JobSkills = models.JobSkills || model("JobSkills", JobSkillsSchema);

export default JobSkills;
