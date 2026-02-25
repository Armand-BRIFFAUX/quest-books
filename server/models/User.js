import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  // ici je définis les colonnes de ta table
  username: {
    type: DataTypes.STRING, // le type de donnée
    allowNull: false, // obligatoire
    unique: true, // doit être unique
  },
  email: {
    type: DataTypes.STRING, // le type de donnée
    allowNull: false, // obligatoire
    unique: true, // doit être unique
  },
  password: {
    type: DataTypes.STRING, // le type de donnée
    allowNull: false, // obligatoire
  },
});

export default User;
