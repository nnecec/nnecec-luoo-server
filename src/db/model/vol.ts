/**
 * 期刊
 */

import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const VolSchema: mongoose.Schema = new Schema({
  id: String,
  title: String,
  img: String,
  link: String,
  comments: Number,
  favs: Number
})

VolSchema.methods = {

}

const vol = mongoose.model('Vol', VolSchema)

export default vol