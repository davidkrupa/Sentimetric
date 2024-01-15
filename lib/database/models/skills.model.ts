import { Schema, model, models } from "mongoose";

const JobSkillsSchema = new Schema({
  userId: String,
  hardSkills: [{ type: String }],
  softSkills: [{ type: String }],
});

const JobSkills = models.JobSkills || model("JobSkills", JobSkillsSchema);

export default JobSkills;
