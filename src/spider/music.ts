import * as cheerio from 'cheerio'

import { fetchPage } from './request'
import * as tool from '../utils/tool'

const API = {
  music: 'http://www.luoo.net/tag/',
  vol: 'http://www.luoo.net/vol/index/'
}

/**
 * 爬取期刊列表
 * 
 * @export
 * @param {string} [tag=''] 期刊分类
 * @param {number} [page=1] 分页
 * @returns 
 */
export async function loadVolList(page?: number = 1, tag?: string = '') {
  const res = await fetchPage(`${API.music}${tag}?p=${page}`)
  const $ = cheerio.load(res)
  const musicList = $('.vol-list .item')
  const items = musicList.map((idx: number, music: CheerioElement) => {
    const title = $(music).children('.meta').children('.name').text()
    const id = title.match(/\d+/g)[0]
    const link = $(music).children('a').attr('href')
    const index = link.split('/')[link.split('/').length - 1]
    const img = $(music).children('.cover-wrapper').children('img').attr('src')

    return {
      id,
      link,
      img,
      title: title.split(' ')[1],
      comments: $(music).children('.meta').children('.comments').text().match(/\d+/)[0],
      favs: $(music).children('.meta').children('.favs').text().match(/\d+/)[0],
      index
    }
  }).get()

  return items
}

/**
 * 爬取期刊音乐列表
 * 
 * @export
 * @param {(string | number)} volIndex 期刊index
 * @returns 
 */
export async function loadMusicList(volIndex: string | number) {
  const res = await fetchPage(`${API.vol}${volIndex}`)
  const $: CheerioStatic = cheerio.load(res)
  const volList = $('.vol-tracklist .track-item')
  const volNumber = $('.vol-name .vol-number').text()

  const items = volList.map((index: number, vol: CheerioElement) => {
    return {
      id: `${volNumber}-${index + 1}`,
      song: $(vol).children('.track-wrapper').children('.trackname').text(),
      artist: $(vol).children('.track-wrapper').children('.track-wrapper .artist').text(),
      src: `http://mp3-cdn2.luoo.net/low/luoo/radio${volNumber}/${tool.fixNumber(index + 1)}.mp3`,

    }
  }).get()

  return items
}

/**
 * 爬取期刊描述
 * 
 * @export
 * @param {(string | number)} volIndex 
 * @returns 
 */
export async function loadVolDesc(volIndex: string | number) {
  const res = await fetchPage(`${API.vol}${volIndex}`)
  const $: CheerioStatic = cheerio.load(res, {
    decodeEntities: false
  })
  const volList = $('.vol-tracklist .track-item')
  const volNumber = $('.vol-name .vol-number').text()
  const tagList = $('.vol-tags .vol-tag-item')
  const tag = tagList.map((index: number, tag: CheerioElement) => {
    return $(tag).text()
  }).get()

  const items = {

    id: volNumber,
    description: $('.vol-desc').html(),
    tag,
    musicCount: volList.length
  }

  return items
}
