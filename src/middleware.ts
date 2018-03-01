import * as compose from 'koa-compose'
import * as convert from 'koa-convert'
import * as cors from 'koa-cors'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import './db/connect'

export default function middleware () {
  return compose([
    convert(cors()),
    logger(),
    bodyParser(),
  ])
}
