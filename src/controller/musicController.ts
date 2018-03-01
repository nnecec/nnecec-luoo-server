import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'

@Controller('/music')
export default class MusicController {

  @Get('/')
  getVolList() {
    console.log('get vol list')
    return 'method: get vol list.'
  }
}