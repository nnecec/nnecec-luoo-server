/**
 * 标签
 */

import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const TagSchema: mongoose.Schema = new Schema({
  code: String,
  name: String
})

TagSchema.methods = {

}

const tag = mongoose.model('Tag', TagSchema)

export default tag