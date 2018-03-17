import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'

import TagModel from '../db/model/tag'


@Controller('/tag')
export default class TagController {

  /**
   * 获取标签列表
   * 
   * @returns 
   * @memberof TagController
   */
  @Get('/list')
  async tagList() {
    const tagList = await TagModel.find({})
    return tagList
  }
}

