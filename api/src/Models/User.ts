import { DataTypes, Sequelize, Model } from "sequelize";
import { UserAttributes } from "../Interfaces/interfaces";

export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public googleId!: string;
    public name!: string | null;
    public email!: string | undefined;
    public password!: string;
    public phone!: string | null;
    public address!: string | null;
    public profilePhoto!: string | undefined;
    public isAdmin!: boolean;
    public isActive!: boolean;
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      googleId: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        validate: {
          isUrl: true,
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "User",
    }
  );

  return User;
};