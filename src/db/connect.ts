import * as mongoose from 'mongoose'

import config from '../config/mongo'

const url = config.mongo.url()
const option = config.mongoOptions

mongoose.connect(url, option).then(() => {
  console.log('Connected to Database.')
}).catch(err => {
  console.log('Connect failed:', err)
})

export default mongoose