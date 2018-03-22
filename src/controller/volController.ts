import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam } from 'routing-controllers'
import * as Vibrant from 'node-vibrant'

import volModel from '../db/model/vol'


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
    const volList = await volModel.find().lean()
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
    let volDetail = await volModel.findOne({ index }).lean()
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
        volModel.findByIdAndUpdate(volDetail._id, { swatches })
      }
    }

    return volDetail
  }
}

