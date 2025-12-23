const userService = require("../services/userService");


// -------------------- API CONTROLLERS --------------------
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json( {message: error.message });
  }
};

// Get all users (for API)
exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({message: 'Erreur Serveur', error: errorMonitor.message});
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
    try {
      const { email } = req.query;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user (PUT)
exports.updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  try{
    if (!user) 
      return res.status(404).json({ message: 'Utilisateur introuvable'});
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur de serveur', error: error.message});
  }
};

// Partially update user (PATCH)
exports.patchUser = async (req, res) => {
    const user = await userService.patchUser(req.params.id, req.body);
    try {
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
  console.log("ID reçu :", req.params.id);
    const user = await userService.deleteUser(req.params.id);
    try {
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// -------------------- EJS CONTROLLERS --------------------

// Render the form to create a new user
// Render create user form
exports.renderNewUser = (req, res) => {
  res.render("newUser", { title: "Create User" });
};


// Create user from EJS form
exports.createUserFromForm = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    // redirect to profile
    res.redirect(`/users/profileUser?id=${user._id}`);
  } catch (error) {
    res.status(400).render("newUser", {
      title: "Create User",
      error: error.message
    });
  }
};

// Render user profil (temporary without auth)
// Après avoir mis à jour avec PATCH ou PUT
exports.renderProfileUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.query.id || req.params.id);
    if (!user) return res.status(404).send("User not found");

    // Render le template EJS 'profileUser.ejs'
    res.render("profileUser", {
      title: "User Profile",
      user,          // on passe l'objet user à EJS
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUserFromForm = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.redirect(`/users/profileUser?id=${updatedUser._id}`);
  } catch (error) {
    res.status(400).render("editUser", {
      title: "Éditer Profil",
      error: error.message,
      user: { ...req.body, _id: req.params.id }
    });
  }
};


// Render edit user form
exports.renderEditUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    if (!user) {
      return res.status(404).render("editUser", {
        title: "Éditer Profil",
        error: "Utilisateur introuvable",
        user: req.body
      });
    }

    // Redirect to profile after update
    res.redirect(`/users/profileUser?id=${user._id}`);
  } catch (error) {
    res.status(400).render("editUser", {
      title: "Éditer Profil",
      error: error.message,
      user: req.body
    });
  }
};