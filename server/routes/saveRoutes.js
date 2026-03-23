import { Router } from "express";
import Save from "../models/Save.js";
import auth from "../middleware/auth.js";

const router = Router();

// Sauvegarder la partie (protégée par auth)
router.post("/api/save", auth, async (req, res) => {
  const { chapterId, playerHp } = req.body;
  const userId = req.userId;

  try {
    await Save.upsert({ userId, chapterId, playerHp });
    res.status(200).json({ message: "Partie sauvegardée" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Charger la sauvegarde (protégée par auth)
router.get("/api/save", auth, async (req, res) => {
  const userId = req.userId;
  try {
    // 1. Chercher la sauvegarde avec req.userId
    const save = await Save.findOne({ where: { userId } });

    // 2. Si elle existe pas → 404
    if (!save) {
      return res.status(404).json({ error: "Partie introuvable" });
    }
    // 3. Si elle existe → la renvoyer en JSON
    res.status(200).json(save);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
