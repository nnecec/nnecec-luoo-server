import { useKoaServer } from 'routing-controllers'
import "./controller"

export default async function (app) {
  const server = useKoaServer(app)
  server.listen(4101);
}