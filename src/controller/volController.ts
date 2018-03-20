import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam } from 'routing-controllers'

import volModel from '../db/model/vol'


@Controller('/api/vol')
export default class VolController {

  /**
   * 获取期刊列表
   * 
   * @returns 
   * @memberof VolController
   */
  @Get('/list')
  async volList(@QueryParam('tag') tag: string, @QueryParam('id') id: string) {

    console.log(tag, id)
    const volList = await volModel.find().lean()
    return volList
  }
}

