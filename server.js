const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const md5 = require('md5');

// import schema
const Users = require('./schemas/Users');
//changedata
//mongoose.connect('mongodb+srv://admin:oam0942217092@mobilecluster.xug0att.mongodb.net/test'
mongoose.connect('mongodb+srv://admin:oam0942217092@mobilecluster.xug0att.mongodb.net/DBApp', {
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

// create user
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
  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`your server is running in http://localhost:${PORT}`);
});

