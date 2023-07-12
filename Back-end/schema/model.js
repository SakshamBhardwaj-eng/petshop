const mongoose = require('mongoose');

const schema = mongoose.Schema
const userschema = new schema({
    email: String,
    password: String

})


const schemaa = new schema({
    id:Number,
    title:String,
    author:String,
    image:String,
})

const productschema = new schema({
    id:Number,
    name:String,
    category:String,
    title:String,
    price:String,
    rating:String
})

const userdatasch = new schema({
    name:String,
    lastname:String,
    address:String,
    phone:String,
    email: String,
    date:String,
    time:String,
    service:String,
    message:String
})

user= mongoose.model('user',userschema)
blogs= mongoose.model('blogs',schemaa)
product = mongoose.model('products',productschema)
guest = mongoose.model('guest',userdatasch)

module.exports= {user,blogs,product,guest}