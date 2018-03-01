import "./utils/polyfill"
import * as Koa from 'koa'
import middleware from './middleware'
import bootstrap from './bootstrap'

const app: Koa = new Koa()

app.use(middleware())

bootstrap(app)
