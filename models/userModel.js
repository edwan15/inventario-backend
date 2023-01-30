const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const useSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "por favor ingresa un nombre"],
    },
    email: {
      type: String,
      required: [true, "por favor ingresa un email "],
      unique: true,
      trim: true,
      Math: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",
      ],
    },
    password: {
      type: String,
      required: [true, "por favor ingresa una contraseña"],
      minLength: [6, "la contraseña debe ser mayor a 6 caracteres"],
    },
    photo: {
      type: String,
      require: [true, "por favor ingresa una foto"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+34",
    },

    bio: {
      type: String,
      maxLength: [250, "la bio debe ser menor a 250 caracteres"],
      default: "biografia",
    },
  },
  {
    timestamps: true,
  }
);

useSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", useSchema);
module.exports = User;
