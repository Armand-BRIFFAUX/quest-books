import { Router } from "express";
import Save from "../models/Save.js";
import auth from "../middleware/auth.js";

const router = Router();

// Sauvegarder la partie (protégée par auth)
router.post("/api/save", auth, async (req, res) => {
  const {
    chapterId,
    playerHp,
    isFighting,
    playerAttack,
    playerDefense,
    inventory,
    equipment,
    visitedChapters,
  } = req.body;
  const userId = req.userId;

  try {
    const existingSave = await Save.findOne({ where: { userId } });

    if (existingSave) {
      await existingSave.update({
        chapterId,
        playerHp,
        isFighting,
        playerAttack,
        playerDefense,
        inventory,
        equipment,
        visitedChapters,
      });
    } else {
      await Save.create({
        userId,
        chapterId,
        playerHp,
        isFighting,
        playerAttack,
        playerDefense,
        inventory,
        equipment,
        visitedChapters,
      });
    }

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
    const save = await Save.findOne({
      where: { userId },
      order: [["updatedAt", "DESC"]],
    });

    if (!save) {
      return res.status(404).json({ error: "Partie introuvable" });
    }
    res.status(200).json(save);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
