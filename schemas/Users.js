const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: String,
  email: String,
  password: String,

}, { timestamps: true, versionKey: false });

const UsersModel = mongoose.model('User', usersSchema);

module.exports = UsersModel;