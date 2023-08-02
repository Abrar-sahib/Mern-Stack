const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      requried: true,
      ref: "User"
    },
    name: {
      type: String,
      requried: [true, "please add contact name"],
    },
    email: {
      type: String,
      requried: [true, "please add contact email"],
    },
    phone: {
      type: String,
      requried: [true, "please add contact phone"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);
