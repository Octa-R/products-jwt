import {Model,DataTypes} from "sequelize"
import {sequelize} from "./connection"
class Auth extends Model {}

Auth.init({
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.STRING
    }
},{
    sequelize,
    modelName:"auth"
})

export {Auth}