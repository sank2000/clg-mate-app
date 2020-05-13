const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, trim: true },
  description: { type: String, trim: true },
  subName: { type: String, trim: true, default: "General" },
  file: { type: String, required: true },
  url: { type: String, required: true },
  postBy: { type: String, required: true },
  materialType: { type: String, default: "Other" }
}, {
  timestamps: true
});

const Material = mongoose.model("materials", MaterialSchema);

module.exports = Material;
