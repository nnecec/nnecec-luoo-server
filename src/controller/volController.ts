import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam } from 'routing-controllers'
import * as Vibrant from 'node-vibrant'

import VolModel from '../db/model/vol'
import MusicModel from '../db/model/music'
import SyncController from './syncController'


@Controller('/api/vol')
export default class VolController {

  /**
   * 获取期刊列表
   * 
   * @param {string} tag 分类
   * @param {number} page 页码
   * @returns 
   * @memberof VolController
   */
  @Get('/list')
  async volList(@QueryParam('tag') tag: string, @QueryParam('page') page: number) {
    const volList = await VolModel.find().lean()
    return volList
  }

  /**
   * 获取期刊详情
   * 
   * @param {string} index 期刊index
   * @returns 
   * @memberof VolController
   */
  @Get('/detail')
  async volDetail(@QueryParam('index') index: string) {
    let volDetail = await VolModel.findOne({ index }).lean()
    console.log(volDetail)
    // 如果没有色板
    if (!volDetail.swatches) {
      const palette = await Vibrant.from(volDetail.img).getPalette()

      if (palette) {
        const swatches = {
          Vibrant: palette.Vibrant && palette.Vibrant.getRgb().join(','),
          LightVibrant: palette.LightVibrant && palette.LightVibrant.getRgb().join(','),
          DarkVibrant: palette.DarkVibrant && palette.DarkVibrant.getRgb().join(','),
          Muted: palette.Muted && palette.Muted.getRgb().join(','),
          LightMuted: palette.LightMuted && palette.LightMuted.getRgb().join(','),
          DarkMuted: palette.DarkMuted && palette.DarkMuted.getRgb().join(','),
        }
        volDetail.swatches = swatches

        // 存入色板属性
        VolModel.findByIdAndUpdate(volDetail._id, { swatches })
      }
    }


    // 从数据库期刊查询期刊包括的音乐列表
    const musicList = await MusicModel.find({ id: eval('/' + volDetail.id + '/') }).lean()
    volDetail.musicList = musicList || []


    let newDetail = {}
    // 如果没有描述 或者 没有音乐列表 则爬取
    if (!volDetail.description || !musicList) {
      newDetail = await new SyncController().loadVolDetail(index)
      volDetail.description = newDetail.vol.description
      volDetail.musicCount = newDetail.vol.musicCount
      volDetail.musicList = newDetail.musicList
    }

    return volDetail
  }
}

