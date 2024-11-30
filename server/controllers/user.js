const { format } = require("path");
const { getCartData } = require("./cart");
const { getAllUserData } = require("./login");
const fs = require('fs')
const getAllUser = async (req, res) => {
   const user = getAllUserData();
   const data = Object.values(user);
   if(data.length != 0){
    return res.status(200).json(data)
   }
   return res.status(404).end("No User Found")
};

const getUser = async (req, res) => {
  const user = getAllUserData();
  const username = req.params.username
  console.log(user);
  const isAvailableUser = Object.keys(user).includes(username)
  console.log(isAvailableUser)
  const userData = Object.values(user).filter(value => value.username == username)
  console.log(userData)
  if(isAvailableUser){
    if(userData[0].isLogin){
      return res.status(200).json(userData[0]);
    }
  }
  return res.status(404).end('Not Found');
};
const deleteUser = async (req, res) => {
   const {username} = req.params;
   console.log(username)
   const user = getAllUserData();
   const cart = getCartData();
   if(username != '' && username != undefined){
     const newUsers =  Object.entries(user).filter(([key,value]) =>  key !== username)
     const newCart = Object.entries(cart).filter(([key,value]) =>  key !== username)
     

     console.log(newUsers);
     console.log(newCart);
     const newUserData = Object.fromEntries(newUsers.map((value,key) => [value[0],value[1]]))
     const newCartData = Object.fromEntries(newUsers.map((value,key) => [value[0],value[1]]))
     console.log(newUserData)

     fs.writeFileSync('./data/user.json',JSON.stringify(newUserData));
     fs.writeFileSync('./data/cart.json',JSON.stringify(newCartData));

     
       return res.status(200).send();  
   }

   return res.status(404).json({message:"User not Deleted"});
};
const updateUser = async (req, res) => {

  // const {data} = req.body;
  const username = req.params.username;
  console.log(username);
  console.log(req.body);
  const data = req.body;
  const user = getAllUserData();

   const newData = Object.entries(user).map(([key,value]) =>{
     if(username == key){
        value = data
     }
     return value;
   })

  //  if(!Object.keys(user).includes(username)){
  //   return res.status(404).json({message:'Username Not Found'})
  //  }
  if(data.username !== username){
     if(Object.keys(user).includes(data.username)){
       return res.status(409).json({message:'Username already exist'});
     } else{
       const result = fs.readFileSync('./data/cart.json');
          const cart = JSON.parse(result)
         updateUserCart(username,cart,data.username,'username')
     }
  }
   const updatedData = Object.fromEntries(newData.map(u => [u.username,u]))
   console.log('updated data : ');
   console.log(updatedData);
   fs.writeFileSync('./data/user.json',JSON.stringify(updatedData));
//   const newUser = Object.values(user).map(data =>{
//     if(credential == data.username){
//      //  data[key] = value,
//      //  ...data
//      console.log("hello")
//       return {...data,[key]:value}
//     }
//     return data;
//  })

//  console.log(newUser)
//  console.log(user)
//  const newUserObject = Object.fromEntries(newUser.map(u => [u.username, u]));
//  fs.writeFile('./data/user.json',JSON.stringify(newUserObject),(e)=>{
//     console.log(e)
//  })

  // console.log(data);
 if(updatedData){

   return res.status(200).json({message:'Data Updated Successfully'});
 } else{
   return res.status(404).json({error:'No Data Found'})
 }

};

const updateUserCart = (username,cart,newUsername,key) =>{
   const newData = Object.entries(cart).map(([key,value]) =>{
     if( key == username){
       key = newUsername,
       value.username = newUsername
     }

     return value;
   })
   console.log(newData);
   const updatedCart = Object.fromEntries(newData.map(u => [u.username,u]));

   console.log( "Updated Cart : ");
   console.log(updatedCart)
   fs.writeFileSync('./data/cart.json',JSON.stringify(updatedCart))
}

const logoutUser = async(req,res) =>{
  const {username} = req.body;
  console.log(username);

  const users = getAllUserData();

  const updatedUser = Object.entries(users).map(([key,value]) =>{
    if(key == username){
        value.isLogin = false;
    } 
    return value;
  })

  // console.log(updatedUser);
  if(updatedUser.length != 0){
    const formattedData = Object.fromEntries(updatedUser.map(u => [u.username,u]));
    // console.log(formattedData)
    fs.writeFileSync('./data/user.json',JSON.stringify(formattedData));
    return res.status(200).json({message:"Logout Successfully"});
  }
  return res.status(404).json({message:'User Not Found'})
  
}
module.exports = { getAllUser, getUser, deleteUser, updateUser,logoutUser };
