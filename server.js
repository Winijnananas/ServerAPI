const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


// import usersschema
const Users = require('./schemas/Users');
//import movies schema
// const Movies = require('./schemas/Movies');


mongoose.connect('mongodb+srv://admin:oam0942217092@mobilecluster.xug0att.mongodb.net/MYAPP_DATA', {
  useNewUrlParser: true
});

app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// สร้าง database schema

//api register create user
app.post('/users', async (req, res) => {
    try {
      const payload = req.body;
      // check if user is exists
      const existsUser = await Users.findOne({username: payload.username});
      if(existsUser) {
        res.json({ status: 'error', message: 'username is exists' });
        return;
      }
      // hash raw password to md5
      payload.password = md5(payload.password);
      const user = new Users(payload);
      await user.save();
      res.json({ status: 'ok', message: 'user created' });
    } catch(error) {
      console.log(error.message);
    }
  });

  //api login
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({username:username, password: md5(password)})

    if(!!user){
      var token = jwt.sign({
        iss:user._id,
        username:user.username,
      }, "MYAPP");
    
      res.json({ status: 'ok', message: 'login success',token });
    } else {
      res.json({status:'error',message:'User not found'});
    }
  });

  //api movie

  app.get('/profile', async (req, res) => {
    try{
      const token = req.headers.authorization.split(' ')[1];
      var iss = jwt.verify(token, SECRET).iss;
      const userprofile = await Users.findOne({_id: iss});
      res.json({status: 200, userprofile});
    } catch(error) {
      res.json({status: 204, message: 'invalid token'});
    }
  });
 
 


  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`your server is running in http://localhost:${PORT}`);
});

