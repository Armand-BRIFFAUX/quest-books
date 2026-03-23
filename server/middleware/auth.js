import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // 1. Récupérer le token depuis le header de la requête
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token manquant" });
  }

  // 2. Le header ressemble à "Bearer eyJhbG..."
  // On veut juste le token, pas le mot "Bearer"
  const token = authHeader.split(" ")[1];

  try {
    // 3. Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Ajouter l'id du user à la requête
    req.userId = decoded.id;

    // 5. Passer à la suite
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};

export default auth;
