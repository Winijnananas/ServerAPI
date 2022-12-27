const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
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
    showurl:String,



}, { timestamps: true, versionKey: false });

const MoviesModel = mongoose.model('Movies', movieSchema);

module.exports = MoviesModel;