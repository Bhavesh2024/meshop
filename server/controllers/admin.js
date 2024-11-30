require('dotenv').config()
const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser');
const handleLogin = async(req,res) =>{
   const data = req.body
   // console.log(data);
   const USERNAME = process.env.USER;
   const PASSWORD = process.env.PASSWORD;
   const KEY = process.env.KEY;
   // const TOKEN = process.env.TOKEN;
   // console.log("username : " + USERNAME);
   // console.log("password : "+ PASSWORD);
   // console.log("Token : "+ TOKEN);
   if(data){
     if(data.username == USERNAME){
       if(data.password == PASSWORD){
          const token = jwt.sign({username:USERNAME},KEY,{expiresIn:'15d'});
          res.cookie('mes_access', token, {
            httpOnly: true,   // Make sure cookie is not accessible via JavaScript
            secure: 'production',  // Secure flag for HTTPS connections (only in production)
            sameSite: 'None', // Allow cross-origin cookies
            maxAge: 60 * 60 * 1000, // Cookie expiration time (1 hour in this example)
          });
          return res.status(200).json({message:'Login Successfully'});
       } else{
          return res.status(409).json({message:'Password Not Matched'})
       } 
     } else{
       return res.status(409).json({message:"Username Not Matched "});
     }
   }  
}

const checkLogin = async(req,res) =>{
   const {username} = req.body;
   const token = req.cookies.mes_access;
   // console.log(token)
   console.log(username);
   if(username == process.env.USER){
      if(!token){
         return res.status(404).json({message:'User not found'});
      }else{
         jwt.verify(token,process.env.KEY,(err,user)=>{
            if(err){
               return res.status(403).json({message:'token expired'})
            }
            return res.status(200).json({message:'verified successfully'});
         })
      }
      
   }

}

const logoutUser = async(req,res) =>{
   const {username}= req.body;
   const token = req.cookies.mes_access;
   // console.log(data)

   if(username == process.env.USER){
      if(token){
         res.cookie('mes_access','',{
            maxAge: new Date(0)
         })
   
         return res.status(200).json({message:'Logout Successfully'});
      }else{
         return res.status(404).json({message:'Invalid User'})
      }
   }else{
      return res.status(404).json({message:'User not found'})
      
   }
}

module.exports = {handleLogin,checkLogin,logoutUser};