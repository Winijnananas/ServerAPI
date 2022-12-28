const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movietwoSchema = new Schema({
    url:String,
    id:String,
    title:String,
    sectitle:String,
    year:String,
    time:String,
    type:[String],
    rate:String,
    desc:String,
    sumlabel:String,
    nameactor:[String],
    produce:[String],
    like:String,
    urltrailer:String,
    bigurl:String,
    idyt:String,
    idyttwo:String,
    idythree:String,



}, { timestamps: true, versionKey: false });

const MoviestwoModel = mongoose.model('Moviestwo', movietwoSchema);

module.exports = MoviestwoModel;