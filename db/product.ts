import {Model,DataTypes} from "sequelize"

import {sequelize} from "./connection"

export class Product extends Model {}

Product.init({
    title:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:"product"
})