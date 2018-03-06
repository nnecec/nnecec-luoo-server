import * as cheerio from 'cheerio'
import { fetchPage } from './request'
import * as tool from '../utils/tool'

const API = {
  music: 'http://www.luoo.net/tag/',
  vol: 'http://www.luoo.net/vol/index/',
  volSong: 'http://mp3-cdn2.luoo.net/low/luoo/radio729/01.mp3'
}

/**
 * 爬取期刊列表
 * 
 * @export
 * @param {string} [tag=''] 期刊分类
 * @param {number} [page=1] 分页
 * @returns 
 */
export async function loadTagList(tag = '', page = 1) {
  const res = await fetchPage(`${API.music}${tag}?p=${page}`)
  const $ = cheerio.load(res)
  const musicList = $('.vol-list .item')
  const items = musicList.map((index: number, music: CheerioElement) => {
    return {
      link: $(music).children('a').attr('href'),
      img: $(music).children('.cover-wrapper').children('img').attr('src'),
      title: $(music).children('.meta').children('.name').text(),
      comments: $(music).children('.meta').children('.comments').text().match(/\d+/)[0],
      favs: $(music).children('.meta').children('.favs').text().match(/\d+/)[0],
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
export async function loadVolList(volIndex: string | number) {
  const res = await fetchPage(`${API.vol}${volIndex}`)
  const $: CheerioStatic = cheerio.load(res)
  const volList = $('.vol-tracklist .track-item')
  const volNumber = $('.vol-name .vol-number').text()

  const items = volList.map((index: number, vol: CheerioElement) => {
    return {
      vol_id: volNumber,
      song: $(vol).children('.track-wrapper').children('.trackname').text(),
      artist: $(vol).children('.track-wrapper').children('.track-wrapper .artist').text(),
      songLink: `http://mp3-cdn2.luoo.net/low/luoo/radio${volNumber}/${tool.fixNumber(index + 1)}.mp3`
    }
  }).get()


  const volInfo = $('.vol-desc').text()

  return items
}