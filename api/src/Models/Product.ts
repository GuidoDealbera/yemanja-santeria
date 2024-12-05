import { DataTypes, Model, Sequelize } from "sequelize";
import { ProductAttributes } from "../Interfaces/interfaces";

export default (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public images!: string[];
    public stock!: number;
  }

  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          min: 5,
          max: 50
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 10,
          max: 1000
        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01
        }
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false,
    }
  );

  return Product;
};
