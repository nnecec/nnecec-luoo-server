import * as mongoose from 'mongoose'

import config from '../config/mongo'

const url = config.mongo.url()
const option = config.mongoOptions

mongoose.connect(url, option)

export default mongoose