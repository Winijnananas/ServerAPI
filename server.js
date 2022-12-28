const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


// import usersschema
//const Favorite = require('./schemas/favorite');
const Users = require('./schemas/Users');
const Movie = require('./schemas/movie');
const Popular = require('./schemas/popular');
const Action = require('./schemas/action');
const Comedy = require('./schemas/comedy');
const Fantasy = require('./schemas/fantasy');
const Romatic = require('./schemas/romantic');

//import movies schema
// const Movies = require('./schemas/Movies');

//mongoose.connect('mongodb+srv://admin:oam0942217092@mobilecluster.xug0att.mongodb.net/MYAPP_DATA'
mongoose.connect('mongodb+srv://admin:oam0942217092@mobilecluster.xug0att.mongodb.net/test', {
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
  app.get('/movies', async (req, res) => {
    const movie = await Movie.find({});
    res.json(movie);
  });
  
  //api moviepopulars
  app.get('/populars', async (req, res) => {
    const populars = await Popular.find({});
    res.json(populars);
  });

//api comedy
  app.get('/comedy', async (req, res) => {
    const comedey = await Comedy.find({});
    res.json(comedey);
  });

  //api fantasy
  app.get('/fantasy', async (req, res) => {
    const fantasy = await Fantasy.find({});
    res.json(fantasy);
  });


  //api romantic
  app.get('/romatic', async (req, res) => {
    const romantic = await Romatic.find({});
    res.json(romantic);
  });

  //apiAction
  app.get('/action', async (req, res) => {
    const action = await Action.find({});
    res.json(action);
  });




//get profile
  app.get('/users/me', async (req, res) => {
    try{
      const token = req.headers.authorization.split(' ')[1];
      var iss = jwt.verify(token, "MYAPP").iss;
      const user = await Users.findOne({_id: iss});
      res.json({status: 200, user});
    } catch(error) {
      res.json({status: 204, error});
    }
  });
 
 //getfavorite
//  app.get('/users/fav', async (req, res) => {
//   try{
//     const token = req.headers.authorization.split(' ')[1];
//     var iss = jwt.verify(token, "MYAPP").iss;
//     const user = await user.findOne({_id: iss});
//     res.json({status: 200, user});
//   } catch(error) {
//     res.json({status: 204, error});
//   }
// });

app.get('/api/Model', (req, res) => {
  // Use the MongoClient to retrieve data from the database
  const collection = client.db('MYAPP').collection('your-collection-name');
  collection.find({}).toArray((err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.send(result);
  });
});



  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`your server is running in http://localhost:${PORT}`);
});

 process.on('unhandledRejection',err=>{
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down the server `);
    server.close(()=>{
      process.exit(1)
    })
 })