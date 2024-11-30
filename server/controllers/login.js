// const { js = require('express');
const fs = require('fs')

const getAllUserData = () =>{
  const result = fs.readFileSync('./data/user.json')
  // console.log(result)
  const user = JSON.parse(result);
  return user

}
const addUser = async (req, res) => {
  console.log('hello')
  console.log(req.body)
  // console.log(req.body.formData)
  const {userData} = req.body;
  console.log(userData)
  // console.log(form)
  // fs.readFile('./data/user.json',(err) =>{
  //   console.log(err)
  // })
  
  const result = fs.readFileSync('./data/user.json')
  console.log(result)
  const user = JSON.parse(result)
  console.log(JSON.parse(result))

 console.log(user);
 console.log(userData)
 console.log("exist : " + checkExistData(user,userData.email));
  if(!checkExistData(user,userData.email)){
      if(!checkExistData(user,userData.phone)){
          if(!checkExistData(user,userData.username)){
            
          //  Object.values(user).push(userData)
          const username = userData.username;
          console.log(user)
          const newUser = {...user,[username]:{...userData,isLogin:false}}
          console.log(newUser)
            fs.writeFile('./data/user.json',JSON.stringify(newUser),(error) =>{
              console.log(error)
            })
            createCart(username);
            // fs.writeFile('./data/cart.json',)
            return res.status(200).json({message:'You are Registered Successfully'})
          } else{
            return res.status(409).json({message:'Username Already Exist'});
          }
      } else{
    return res.status(409).json({message:'Phone Number Already Exist'})
      }
  } 
    return res.status(409).json({message:'Email Already Exist'})
  
};

const createCart = (username) =>{
   const result = fs.readFileSync('./data/cart.json');
   console.log(result);
   if(result == null){
      fs.writeFileSync('./data/cart.json',`{
          "${username}" : {
             "username":"${username}",
             "cart":[]
          }
        }`)
   }else{
     console.log(result);
     const cart = JSON.parse(result);
     const newObj = {
       username:username,
       cart:[]
     }
     const newData = {...cart,[username]:newObj}
     console.log(newData);
     fs.writeFileSync('./data/cart.json',JSON.stringify(newData));
   }
}
const checkExistData = (user,data) => {
  // const isExist = Object.keys(user).map(key => {
  //   Object.entries(key).filter(([key,value]) =>{
  //      value.includes(data)
  //   })
  // // })
  // const usernameList = [];
  // Object.keys(user).map(key => {
  //   usernameList.push(key);
  // });
  // console.log("key" + usernameList);
  // console.log(usernameList)
  // usernameList.map(value =>{
  //   console.log(value);
  //   console.log(Object.values('bhavesh_1724').includes(data))
  //   if(Object.entries(value).includes(data)){
  //      return true;
  //   }
    
  // })
  // return false;
  // console.log(user)
  console.log(data)
  let isExist = false;
  const result = Object.entries(user).filter(([key,value]) => {
    // console.log("object "  + key + value);
    // console.log("Result : " + Object.values(value).includes)
     return Object.values(value).includes(data)
  })
  // return Object.entries(user);
  console.log(result);
  if(result.length != 0){
    isExist = true;
  }else{
    isExist = false;
  }
  return isExist;

}
const validateData = async (req, res) => {};

const authUser = async (req, res) => {
    console.log(req.body);
    const {user,password} = req.body
    const userData = getAllUserData();
    const isEmailExist = checkExistData(userData,user);
    console.log("Username : " + checkIsUsername(user))
    const isUsernameExist = checkIsUsername(user) ? checkExistData(userData,user) : false;
    const email = !checkIsUsername(user) ? user : "";
    const isPasswordMatched = isMatchedPassword(email,user,password);
    console.log("email : " + isEmailExist)
    console.log("username: " + isUsernameExist)
    console.log("password:" + isPasswordMatched)
    if(isEmailExist || isUsernameExist){
       if(isPasswordMatched){
         if(email != ""){
           const data = getDataFromEmail(email);
          //  console.log(data[0])
           const username = data[0]
           updateCredentialStatus(userData,username,"isLogin",true)  
        return res.status(200).json({message:'Login Successfully',username:username})
        }
        updateCredentialStatus(userData,user,"isLogin",true)  
        return res.status(200).json({message:'Login Successfully',username:user})
       } else{
        return res.status(401).json({message:"Password Doesn't Matched"});
       }
    } 
       return res.status(404).json({message:"Username or Email not found"});

    // res.status(200).json({message:'reached'});

};
const updateCredentialStatus = (user,credential,key,value) =>{
    
    const newUser = Object.values(user).map(data =>{
       if(credential == data.username){
        //  data[key] = value,
        //  ...data
        console.log("hello")
         return {...data,[key]:value}
       }
       return data;
    })

    console.log(newUser)
    console.log(user)
    const newUserObject = Object.fromEntries(newUser.map(u => [u.username, u]));
    fs.writeFile('./data/user.json',JSON.stringify(newUserObject),(e)=>{
       console.log(e)
    })
    
}
const isMatchedPassword = (email,username,password) =>{

    if(email != ""){
      const data = getDataFromEmail(email);
      const fetchedPassword = data[1];


      if(password == fetchedPassword){
         return true;
      }
    
    } else{
       if(password == getPasswordFromUsername(username)){
        return true;
       }
    }

    return false;

}

const getDataFromEmail = (email) =>{
  const user = getAllUserData();
  let username = ''
  let password = ''
  Object.values(user).map(value => {
     if(value.email == email){
        username = value.username
        password = value.password
     }
  })

  return [username,password];
}

const getPasswordFromUsername = (username) =>{
   let password = ''
   const user = getAllUserData();
   Object.values(user).map(value =>{
     if(value.username == username){
       password = value.password
     }
   })

   return password;
}
const checkIsUsername = (data) =>{
  const userNamePattern = /^[A-Za-z0-9_.]{3,15}$/
  return userNamePattern.test(data);
}

module.exports = { addUser, validateData, authUser,checkIsUsername,getAllUserData };
