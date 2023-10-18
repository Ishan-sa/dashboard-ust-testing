import { Mongoose } from "mongoose";

const scheduleSchema = new Mongoose.Schema({
  siteNumber: Number,
  analysisStatus: String,
  incTicketNumber: String,
  xPEX: String,
  bridgeSupport: String,
  assignedTo: String,
  shift: String,
  hoRequired: String,
  notes: String,
  hoEngineer: String,
  dateCompleted: String,
});

const Schedule = Mongoose.model("schedule", scheduleSchema);

export default Schedule;
