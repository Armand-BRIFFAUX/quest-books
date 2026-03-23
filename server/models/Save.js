import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Save = sequelize.define("Save", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, // type entier, obligatoire
  },
  chapterId: {
    type: DataTypes.INTEGER,
    allowNull: false, // type entier, obligatoire
  },
  playerHp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20, // type entier, obligatoire, valeur par défaut 20
  },
});

export default Save;
