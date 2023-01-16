import {Model,DataTypes, UUIDV4} from "sequelize"

import {sequelize} from "./connection"

export class User extends Model {}


User.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey: true
    },
    fullname:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:"user"
})


