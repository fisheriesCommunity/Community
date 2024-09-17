const User = require("../model/boatregistation model"); // Import with a consistent name

// Display all users
const getAllusers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching users" });
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ users });
};

// Add a new user
const addusers = async (req, res, next) => {
    const { name, Numberof, phone } = req.body;

    let newUser;

    try {
        newUser = new User({ name, Numberof, phone});
        await newUser.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding user" });
    }

    return res.status(201).json({ newUser });
};

// Get user by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching user" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
}

// Update user details
const updateuser = async (req, res, next) => {
    const id = req.params.id;
    const { name, Numberof, phone } = req.body;

    let updatedUser;
    
    try {
        updatedUser = await User.findByIdAndUpdate(
            id,
            { name: name, Numberof: Numberof, phone: phone }, // Ensure correct case
            { new: true } // This option returns the updated document
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating user details" });
    }

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: updatedUser });

}
//delete user
const deleteuser = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findByIdAndDelete(id); // Correctly using the User model
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting user" });
    }

    if (!user) { // Check if user was found and deleted
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully", user });
};


exports.getAllusers = getAllusers;
exports.addusers = addusers;
exports.getById = getById;
exports.updateuser = updateuser;
exports.deleteuser = deleteuser;
