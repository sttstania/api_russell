const bcrypt = require('bcryptjs');
const User = require('../models/User');

// -------------------- Whitelists --------------------
const USER_PUT_FIELDS = ['name', 'email', 'password'];
const USER_PATCH_FIELDS = ['name', 'email', 'password'];

// Helper to filter authorised fields
const pick = (obj, allowed) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => allowed.includes(key)));

// -------------------- CREATE --------------------
exports.createUser = async ({ name, email, password }) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    passwordHash
  });

  await newUser.save();
  return newUser.toObject({ getters: true, versionKey: false, transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  }});
};

// -------------------- READ --------------------
exports.getAllUsers = async () => {
  return await User.find().select('-passwordHash');
};

exports.getUserById = async (id) => {
  return await User.findById(id).select('-passwordHash');
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email }).select('-passwordHash');
};

// -------------------- UPDATE PUT --------------------
exports.updateUser = async (id, data) => {
  const filteredData = pick(data, USER_PUT_FIELDS);

  // Vérifier que tous les champs sont présents
  for (const field of USER_PUT_FIELDS) {
    if (!filteredData[field]) {
      throw new Error(`Missing field: ${field}`);
    }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(filteredData.password, 10);

  const user = await User.findByIdAndUpdate(
    id,
    {
      name: filteredData.name,
      email: filteredData.email,
      passwordHash
    },
    {
      new: true,
      runValidators: true,
      overwrite: true
    }
  ).select('-passwordHash');

  return user;
};

// -------------------- PATCH --------------------
exports.patchUser = async (id, data) => {
  const filteredData = pick(data, USER_PATCH_FIELDS);

  // Hasher le password si présent
  if (filteredData.password) {
    filteredData.passwordHash = await bcrypt.hash(filteredData.password, 10);
    delete filteredData.password;
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: filteredData },
    { new: true, runValidators: true }
  ).select('-passwordHash');

  return user;
};

// -------------------- DELETE --------------------
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
