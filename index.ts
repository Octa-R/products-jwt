import * as express from "express"
import * as crypto from "crypto"
import { User, Product, Auth } from "./db"
const app = express()
const port = process.env.PORT || 3000
const SECRET = "unsecreto"
import * as bearerToken from "bearer-token"
import * as jwt from "jsonwebtoken"
app.use(express.json())
function hash (string) {
    return crypto
        .createHash("sha256")
        .update(string)
        .digest("hex")
}

function authMiddleWare(req,res,next) {
    bearerToken(req, (err, token)=> {
        if(err){
            res.status(401).json({err})
        }
        try{
            const decoded = jwt.verify(token,SECRET)
            req._user = decoded
            next()
        } catch(err) {
            res.status(401).json({err})
        }
    })
}

app.post("/products",authMiddleWare,async (req:any,res) => {
    const id = req._user.id
    const prod = await Product.create(req.body)
})

app.get("/",(req,res)=>{
    res.json({hola:"hola"})
})

app.get("/me",authMiddleWare,async (req:any,res)=>{
    const user = await User.findByPk(req._user.id)
    res.json(user)
})

//app.use(authMiddleWare)

//register
app.post("/signup",async (req,res)=> {
    const {email,password,fullname} = req.body
    const user = await Auth.findOne({ where: { email: email } });
    if(user){
        res.json({ok:false,message:"el email ya se encuentra en uso"})
        return
    }
    const hashedPass = hash(password)
    const userData = await User.create({fullname,email})
    const newUser = await Auth.create({ email, password:hashedPass,userId:userData.get("id") });
    res.json(newUser)
})
//login
app.post("/signin",async (req,res)=> {
    const {email,password} = req.body
    const auth = await Auth.findOne({ where: { email,password:hash(password) } });
    if(!auth){
        res.json({ok:false,message:"email o password incorrectos"})
        return
    }
    const token = jwt.sign({id:auth.get("userId"),email:auth.get("email")},SECRET)
    res.json({
        token
    })
})

app.listen(port,()=>{
    console.log("app en puerto 3000")
})
