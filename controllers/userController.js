const userService = require("../services/userService");


exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({message: 'Erreur Serveur', error: errorMonitor.message});
  }
};

exports.getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  try{
    if (!user)
      return res.status(404).json({ message: 'Utilisateur introuvable', error: error.message});
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur Serveur', error: error.message});
  }
}


exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json( {message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const user = await userService.updatedUser(req.params.id, req.body);
  try{
    if (!user) 
      return res.status(404).json({ message: 'Utilisateur introuvable'});
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur de serveur', error: error.message});
  }
};

exports.deleteUser = async (req, res) => {
  console.log("ID reçu :", req.params.id);
    const user = await userService.deleteUser(req.params.id);
    try {
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};
