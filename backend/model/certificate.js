import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  certificateName: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  }

},{timestamps: true});

 const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;