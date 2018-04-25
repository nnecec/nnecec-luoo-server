import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'

import * as musicSpider from '../spider/music'
import * as tagSpider from '../spider/tag'
import VolModel from '../db/model/vol'
import TagModel from '../db/model/tag'
import MusicModel from '../db/model/music'

@Controller('/api/sync')
export default class SyncController {

  /**
   * 获取期刊列表
   * 
   * @returns 
   * @memberof SyncController
   */
  @Post('/vol')
  async loadvolList() {
    const volList = await musicSpider.loadVolList()
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
  @Post('/vol/:index')
  async loadVolDetail(@Param('index') index: number | string) {
    const vol = await musicSpider.loadVolDesc(index)
    const musicList = await musicSpider.loadMusicList(index)

    VolModel.update({ id: vol.id }, vol, { upsert: true }, (err, rawResponse) => {
      console.log(err, rawResponse)
    })

    musicList.forEach(music => {
      MusicModel.update({ id: music.id }, music, { upsert: true }, (err, rawResponse) => {
        console.log(err, rawResponse)
      })
    })

    return { vol, musicList }
  }

  /**
   * 获取标签列表
   * 
   * @returns 
   * @memberof SyncController
   */
  @Post('/tag')
  async loadTagList() {
    const tagList = await tagSpider.loadTagList()
    tagList.forEach(tag => {
      TagModel.update({ code: tag.code }, tag, { upsert: true }, (err, rawResponse) => {
        console.log(err, rawResponse)
      })
    })
    return tagList
  }
}

