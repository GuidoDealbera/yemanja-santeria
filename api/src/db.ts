import { Sequelize } from "sequelize";
import "dotenv/config";
const { DB_CONEX } = process.env;
import ProductModel from "./Models/Product";
import UserModel from "./Models/User";

const sequelize = new Sequelize(`${DB_CONEX}`, {
  logging: false,
  native: false,
});

ProductModel(sequelize);
UserModel(sequelize);
const { Product, User } = sequelize.models;
if(User && Product){
  User.belongsToMany(Product, { through: "user_product", timestamps: false });
  Product.belongsToMany(User, { through: "user_product", timestamps: false });
}

export const DataBase = {
    ...sequelize.models,
    conn: sequelize,
}