const { deleteMany } = require('../models/Catway');
const User = require('../models/User');

//get all users
exports.getAllUsers = () => User.find();

//get :id
exports.getUserById = (id) => User.findById();

// Get :email
exports.getUserByEmail = (email) => User.findOne(email);

//Create a new user
exports.register = async (name, email, password) => {

    //check if email exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        const error = new Error('Email already in use');
        error.code = 'EMAIL_EXISTS';
        throw error;
    }

    // Create user
    const user = await User.create({
        name: data.name,
        email: data.email,
        passwordHash: data.password           //hash dans model
    });

    await user.save();

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};

//Update User
exports.updatedUser = async (id, data) => {
    if ('createdAt' in data) delete data.createdAt;

    const UpdatedUser = await User.findByIdAndUpdate(id, data, {new: true});
    return this.updatedUser
}

// Delete User
exports.deleteUser = (id) => User.findByIdAndDelete(id);