/**
 * 音乐
 */

import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const MusicSchema: mongoose.Schema = new Schema({
  id: String,
  song: String,
  artist: String,
  src: String
})

MusicSchema.methods = {

}

const music = mongoose.model('Music', MusicSchema)

export default music