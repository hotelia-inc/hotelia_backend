const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const USER_TYPES = {
  CONSUMER: "consumer",
  HOTEL_SUPPORT: "hotelSupport",
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.statics.createUser = async function (
  firstName,
  lastName,
  email,
  password,
  type
) {
  try {
    const user = await this.create({
      firstName,
      lastName,
      email,
      password,
      type,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) {
      throw { error: "No user with this id found" };
    }
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword);
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
