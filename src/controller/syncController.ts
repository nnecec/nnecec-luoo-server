import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'

import * as musicSpider from '../spider/music'

@Controller('/sync')
export default class SyncController {

  /**
   * 获取期刊列表
   * 
   * @returns 
   * @memberof SyncController
   */
  @Get('/music')
  async loadMusicList() {
    const musicList = await musicSpider.loadTagList()
    return musicList
  }

  /**
   * 获取期刊详情
   * 
   * @returns 
   * @memberof SyncController
   */
  @Get('/vol/:index')
  async loadVolList(@Param('index') index: number) {
    const musicList = await musicSpider.loadVolList(index)
    return musicList
  }
}