import { Router } from "express";
import { adventure, chapters } from "../data/adventure.js";

const router = Router();

router.get("/api/adventure", (req, res) => {
  res.json(adventure);
});

router.get("/api/chapters/:id", (req, res) => {
  const id = req.params.id; // récupérer l'id depuis les params
  const idNumber = parseInt(id); // convertir en nombre (parseInt)
  const chapter = chapters.find((c) => c.id === idNumber); // trouver le chapitre dans le tableau avec .find()

  if (!chapter) {
    return res.status(404).json({ error: "Ce chapitre n'existe pas :(" });
  }

  res.status(200).json(chapter);
});

export default router;
