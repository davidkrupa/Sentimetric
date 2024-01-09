import { Schema, model, models } from "mongoose";

const JobSkillsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  jobTitle: { type: String, required: true },
  skills: {
    hardSkills: [
      {
        skill: { type: String, required: true },
        groups: [{ type: String }],
      },
    ],
    softSkills: [
      {
        skill: { type: String, required: true },
        groups: [{ type: String }],
      },
    ],
  },
});

const JobSkills = models.JobSkills || model("JobSkills", JobSkillsSchema);

export default JobSkills;
