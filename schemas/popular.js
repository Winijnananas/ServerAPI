const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popularSchema = new Schema({
    url:String,
    id:String,
    title:String,
    type:String,
    rate:String,
    desc:String,
    sumlabel:String,
    nameactor:[String],
    produce:String,



}, { timestamps: true, versionKey: false });

const PopularsModel = mongoose.model('Populars', popularSchema);

module.exports = PopularsModel;