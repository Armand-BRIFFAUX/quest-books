import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Leaderboard = sequelize.define("Leaderboard", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  playerHp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timePlayed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Leaderboard;
