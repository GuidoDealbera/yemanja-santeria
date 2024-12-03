import { DataBase } from "../../db";
const {User, Product} = DataBase.conn.models;
const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({where: {
            email: email,
        }, include: {
            model: Product,
        },
    });
    
        return user
    } catch (error: any) {
        return error.message
    }
}

export default getUserByEmail;