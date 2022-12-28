const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  urluser:String,
  fname:String,
  username: String,
  email: String,
  password: String,
  favorite:String,



}, { timestamps: true, versionKey: false });

const UsersModel = mongoose.model('User', usersSchema);

module.exports = UsersModel;