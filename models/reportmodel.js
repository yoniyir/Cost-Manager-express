const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  report: {
    food: [],
    health: [],
    housing: [],
    sport: [],
    education: [],
    transportation: [],
    other: []
  }
});

const ReportModel = mongoose.models.ReportSchema || mongoose.model('Report', ReportSchema);


module.exports = ReportModel;
