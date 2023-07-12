const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const {blogs,user,product,guest} = require("../schema/model")

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/usersdata'
mongoose.connect(url,{useNewUrlParser:true})

const con = mongoose.connection

con.on('open',()=>{
    console.log("connected...");
})


// USER LOGIN/SIGNUP
router.get('/',async(req,res)=>{

    try{

        const users =await user.find()
        res.json(users)

    }catch(err){
        res.send('Error' + err)
    }   
    
    
})

router.post('/register',async(req,res)=>{
    const userr = new user({
        email: req.body.email,
        password: req.body.password,
    })
    try{
        try {
            const registeredUser = await userr.save();
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            res.send({ token });
          } catch (error) {
            console.log(error);
          }
    }catch(err){
        res.send(err)
    }
})

router.post('/login',async (req,res)=>{
    const userr = new user({
        email:req.body.email,
        password:req.body.password
    })


    const data=await user.findOne({email:userr.email})
        
    if(!data){
        res.status(401).send('INVALID USER')
    }else{
        if(data.password!=userr.password){
            res.status(401).send("INVALID PASSWORD")
        }else{
            try {
                let payload = { subject: data._id };
                let token = jwt.sign(payload, 'secretKey');
                res.send({ token });
              } catch (error) {
                console.log(error);
              }
        
        }
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const userr =await user.findById(req.params.id).deleteOne()
        const a1 = await userr.remove()
        res.send(a1)
    }catch(err){
        res.send(err)
    }
})


// BLOGS
router.get('/blogs',async(req,res)=>{

    try{

        const blog= await blogs.find()
        res.json(blog)
    }catch(err){
        res.send("error"+err)
    }
})

router.get('/blogs/:id',async(req,res)=>{

    try{
        const blog =await blogs.findById(req.params.id)
        res.json(blog)

    }catch(err){
        res.send('Error' + err)
    }
    
})

router.post('/blogs/post',async (req,res)=>{
    const blog = new blogs({
        id:req.body.id,
        title:req.body.title,
        author:req.body.author,
        image:req.body.image,
    })
    try{
        const a1= blog.save()
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})

// PRODUCTS
router.get('/products', async (req, res) => {
    const searchTerm = req.query.q;
  
    try {
      const regex = new RegExp(searchTerm, 'i');
      const products = await product.find({ category: regex }).exec();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


router.get('/product',async(req,res)=>{

    try{

        const products= await product.find()
        res.json(products)
    }catch(err){
        res.send("error"+err)
    }
})


router.post('/product/reg',async (req,res)=>{
    const products = new product({
        id:req.body.id,
        name:req.body.name,
        category:req.body.category,
        title:req.body.title,
        price:req.body.price
    })
    try{
        const a1= products.save()
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})


// contact form data
router.get('/contact',async(req,res)=>{

    try{

        const guests = await guest.find()
        res.json(guests)
    }catch(err){
        res.send('error'+err)
    }
})


router.post('/contact/reg',async (req,res)=>{
    const guests = new guest({
        name:req.body.name,
        lastname:req.body.lastname,
        address:req.body.address,
        phone:req.body.phone,
        email:req.body.email,
        date:req.body.date,
        time:req.body.time,
        service:req.body.service,
        message:req.body.message
    })
    try{
        const a1= guests.save()
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})








module.exports = router;