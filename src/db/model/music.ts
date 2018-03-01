/*
 * 文章详情 model
 * 
*/
import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const MusicSchema: mongoose.Schema = new Schema({
  id: { type: String, index: true },
  title: String,
  artist: String,
  album: String,
  imageSource: String,
  url: String,
})

MusicSchema.methods = {
  save: function () {

  },
  delete: function () {

  },
  search: function () {

  },
}

const music = mongoose.model('Music', MusicSchema)

export default music