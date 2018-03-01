import * as compose from 'koa-compose'
import * as Router from 'koa-router'


var router = new Router();

router.get('/music', musicController);

const routes = compose([router.routes(), router.allowedMethods()])

export default routes