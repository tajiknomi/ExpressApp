const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nameOfApplicant: { type: String, required: true }, // Name of Applicant
  guardianName: { type: String, required: true }, // Guardian Name
  cnic: { type: String, required: true, unique: true }, // CNIC
  dateOfBirth: { type: Date, required: true }, // Date of Birth
  religion: { type: String, required: true }, // Religion
  domicile: { type: String, required: true }, // Domicile
  passportNo: { type: String, required: false }, // Passport No (Optional)
  mailingAddress: { type: String, required: true }, // Mailing Address
  permanentAddress: { type: String, required: true }, // Permanent Address
  city: { type: String, required: true }, // City
  district: { type: String, required: true }, // District
  country: { type: String, required: true }, // Country
  email: { type: String, required: true }, // Email
  phoneNoRes: { type: String, required: true }, // Phone No. (Res) (Required)
  officeNo: { type: String, required: false }, // Office No. (Optional)
  mobileNo: { type: String, required: true }, // Mobile No. (Required)
  nextOfKinName: { type: String, required: true }, // Next of Kin Name
  nextOfKinRelation: { type: String, required: true }, // Next of Kin Relation with applicant
  nextOfKinCnic: { type: String, required: true }, // Next of Kin CNIC
  nextOfKinDateOfBirth: { type: Date, required: true }, // Next of Kin Date of Birth
  nextOfKinPassport: { type: String, required: false }, // Next of Kin Passport (Optional)
  plotSize: { type: Date, required: true }, 
  attachments: { type: [String], default: [] }, // Array of image paths (Attachments)
});


const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
