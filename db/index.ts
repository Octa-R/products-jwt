import { User } from "./user";
import { Product } from "./product";
import { Auth } from "./auth"

User.hasMany(Product);
Product.belongsTo(User);

Auth.belongsTo(User);
User.hasOne(Auth)

export { User, Product,Auth };