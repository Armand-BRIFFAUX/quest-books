import { Router } from "express";
import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const router = Router();

// Route inscription
router.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    const hash = await argon2.hash(password);

    await User.create({
      username,
      email,
      password: hash,
    });

    res.status(201).json({ message: "Compte créé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Route connexion
router.post("/api/login", async (req, res) => {
  // 1. Récupérer email et password depuis req.body
  const { email, password } = req.body;
  // 2. Vérifier que les champs sont remplis
  if (!email || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }
  // 3. Chercher l'utilisateur avec User.findOne
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Si aucun utilisateur trouvé => erreur d’authentification
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    // Récupère le mot de passe haché stocké en base
    const hash = user.password;

    // Vérifie si le mot de passe saisi correspond au hash
    const ok = await argon2.verify(hash, password);

    if (!ok) {
      // Si la vérification échoue => mauvais mot de passe
      return res.status(400).json({ error: "Identifiants incorrects" });
    }
    // Crée un token JWT contenant les infos de l’utilisateur
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
