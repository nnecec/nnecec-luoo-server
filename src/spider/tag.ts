import * as cheerio from 'cheerio'
import { fetchPage } from './request'
import * as tool from '../utils/tool'

const API = {
  music: 'http://www.luoo.net/music/',
}

/**
 * 爬取标签列表
 * 
 * @export
 * @param {string} [tag=''] 期刊分类
 * @param {number} [page=1] 分页
 * @returns 
 */
export async function loadTagList(tag?= '', page?= 1) {
  const res = await fetchPage(API.music)
  const $ = cheerio.load(res)
  const tagList = $('.pagenav-wrapper a')

  const items = tagList.map((index: number, tag: CheerioElement) => {

    const link = $(tag).attr('href').split('/')
    const code = link[link.length - 1]
    return {
      code,
      name: $(tag).text()
    }
  }).get()

  return items
}


/**
 * 获取期刊页数
 * 
 * @export
 * @returns 
 */
export async function loadPagesCount() {
  const res = await fetchPage(API.music)
  const $ = cheerio.load(res)
  const page = $('.break+.page').text()

  return page
}


