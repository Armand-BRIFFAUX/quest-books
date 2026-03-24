import express from "express";
import cors from "cors";
import router from "./routes/adventureRoutes.js";
import sequelize from "./config/database.js";

// import des models
import authRouter from "./routes/authRoutes.js";
import saveRouter from "./routes/saveRoutes.js";
import leaderboardRouter from "./routes/leaderboardRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(authRouter);
app.use(saveRouter);
app.use(leaderboardRouter);

const PORT = process.env.PORT || 3000;

// Tester la connexion à la BDD puis lancer le serveur
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à PostgreSQL réussie !");
    return sequelize.sync(); // ← crée/met à jour les tables
  })
  .then(() => {
    console.log("Tables synchronisées !");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });
