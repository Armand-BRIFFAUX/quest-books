import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Save = sequelize.define("Save", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  chapterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  playerHp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20,
  },
  isFighting: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  playerAttack: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
  playerDefense: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
  inventory: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "[]",
  },
  equipment: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '{"weapon":null,"armor":null}',
  },
});

export default Save;
