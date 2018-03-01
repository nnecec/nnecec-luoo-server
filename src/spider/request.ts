import * as request from 'request'

export function fetchPage(url: string) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(err)
      }
      resolve(body)
    })
  })
}