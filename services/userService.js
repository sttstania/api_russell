const User = require('../models/User');


// POST
exports.createUser = async ({ name, email, password }) => {
    const newUser = new User({
        name,
        email,
        passwordHash: password // hash in models
    });
    await newUser.save();
    return newUser;
}

// get all
exports.getAllUsers = async () => {
    return await User.find().select('-passwordHash');
}

// get by id
exports.getUserById = async (id) => { 
    return await User.findById(id).select('-passwordHash');
}

// get by Email
exports.getUserByEmail = async (email) => { 
    return await User.findOne({ email }).select('-passwordHash');
}

// PUT 
exports.updateUser = async (id, data) => {
    if (data.password) {
        data.passwordHash = data.password;
        delete data.password;
    }

    delete data._id;
    delete data.createdAt;
    delete data.updatedAt;
    return await User;
};

// PATCH
exports.patchUser = async (id, data) => {
    if (data.password) {
        data.passwordHash = data.password;
        delete data.password;
  }
    delete data._id;
    delete data.createdAt;

    return await User.findByIdAndUpdate(
        id,
        { $set: data }, 
        { 
            new: true, 
            runValidators: true 
        }
    );
};

// Delete
exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};
