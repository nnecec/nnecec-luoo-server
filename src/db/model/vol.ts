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
  favs: Number,
  description: String,
  tag: Array,
  musicCount: Number,
  index: String, // 期刊链接id
  swatches: Object
})

VolSchema.methods = {

}

const vol = mongoose.model('Vol', VolSchema)

export default vol