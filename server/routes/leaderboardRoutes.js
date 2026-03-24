import { Router } from "express";
import { Op } from "sequelize";
import Leaderboard from "../models/Leaderboard.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = Router();

// GET /api/leaderboard — top 20 (public)
router.get("/api/leaderboard", async (req, res) => {
  try {
    const scores = await Leaderboard.findAll({
      order: [
        ["playerHp", "DESC"],
        ["timePlayed", "ASC"],
      ],
      limit: 20,
    });
    res.status(200).json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/leaderboard — enregistrer un score (protégé)
router.post("/api/leaderboard", auth, async (req, res) => {
  const { playerHp, timePlayed } = req.body;
  const userId = req.userId;

  if (playerHp == null || timePlayed == null) {
    return res.status(400).json({ error: "playerHp et timePlayed requis" });
  }

  try {
    const existing = await Leaderboard.findOne({ where: { userId } });

    if (existing) {
      // Ne remplacer que si meilleur score (plus de PV, ou même PV mais plus rapide)
      const isBetter =
        playerHp > existing.playerHp ||
        (playerHp === existing.playerHp && timePlayed < existing.timePlayed);

      if (!isBetter) {
        return res.status(200).json({ message: "Score existant est meilleur", updated: false });
      }

      await existing.update({
        playerHp,
        timePlayed,
        completedAt: new Date(),
      });
    } else {
      const user = await User.findByPk(userId);

      await Leaderboard.create({
        userId,
        username: user.username,
        playerHp,
        timePlayed,
        completedAt: new Date(),
      });
    }

    // Calculer la position du joueur
    const rank = await Leaderboard.count({
      where: {
        [Op.or]: [
          { playerHp: { [Op.gt]: parseInt(playerHp) } },
          {
            playerHp: parseInt(playerHp),
            timePlayed: { [Op.lt]: parseInt(timePlayed) },
          },
        ],
      },
    });

    res.status(200).json({ message: "Score enregistré", updated: true, rank: rank + 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
