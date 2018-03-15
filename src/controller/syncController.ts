import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'

import * as musicSpider from '../spider/music'
import VolModel from '../db/model/vol'
import vol from '../db/model/vol';

@Controller('/sync')
export default class SyncController {

  /**
   * 获取期刊列表
   * 
   * @returns 
   * @memberof SyncController
   */
  @Get('/vol')
  async loadvolList() {
    const volList = await musicSpider.loadTagList()
    volList.forEach(vol => {
      VolModel.update({ id: vol.id }, vol, { upsert: true }, (err, rawResponse) => {
        console.log(err, rawResponse)
      })
    })

    return volList
  }

  /**
   * 获取期刊详情
   * 
   * @returns 
   * @memberof SyncController
   */
  @Get('/vol/:index')
  async loadVolList(@Param('index') index: number) {
    // const musicList = await musicSpider.loadVolList(index)
    const musicList = await musicSpider.loadVolDesc(index)
    return musicList
  }
}