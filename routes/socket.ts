import { join } from 'path'
import { inPath, txtPath } from '../globals'
import { Channels } from '../src/config/Channels'
import { each, keys } from 'lodash'
import { existsSync, readFile, readFileSync, writeFileSync } from 'fs'

const S = require('string')
const _ = require('lodash')
const fs = require('fs')

module.exports = function (socket) {
  const channelsIds = keys(Channels)

  each(channelsIds, (channelId) => {
    Channels[channelId].exists = existsSync(join(inPath, `${channelId}.txt`))
  })

  socket.emit('init', {
    channels: Channels
  })

  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: '1'
    })
  })

  socket.on('channel:process', function (data: { channelId: string }) {
    console.log(data)
    console.log('channel:process: ' + data.channelId)
    const corrections_list = loadCorrectionsLists(data.channelId)
    readFile(join(inPath, `${data.channelId}.txt`), { encoding: 'utf-8' }, function (err, content) {
      if (err) throw err
      content = content.replace(/\r\n/g, '\n')
      const lines = content.split('\n')
      const updated = []
      _.each(lines, function (element, index, list) {
        element = element.replace(/^\s*(\d)[:.](\d\d)/g, '0$1.$2')
        const time_pattern = /^\s*(\d\d)[.:](\d\d)\s*(.*)\s*$/g
        const day_pattern = /^\s*(ПОНЕДЕЛЬНИК|ВТОРНИК|СРЕДА|ЧЕТВЕРГ|ПЯТНИЦА|СУББОТА|ВОСКРЕСЕНЬЕ|Понедельник|Вторник|Среда|Четверг|Пятница|Суббота|Воскресенье).*$/g
        const age_pattern = /\[?\(?(0|6|12|16|18)\s*\+\)?]?/g
        const match_programme = time_pattern.exec(element)
        const match_day = day_pattern.exec(element)
        if (match_programme && match_programme[3].length > 2) {
          const match_age = age_pattern.exec(match_programme[3])
          const programme: any = {
            type: 'programme',
            time: match_programme[1] + '.' + match_programme[2],
            string: match_programme[3]
          }
          if (match_age) {
            programme.age = match_age[1]
            programme.string = programme.string.replace(match_age[1] + '+', '')
            programme.string = programme.string.replace(' []', '')
          }
          updated.push(programme)
        } else if (match_day) {
          updated.push({ type: 'day', string: S(match_day[1]).capitalize().s })
        }
      })
      _.each(updated, function (programme, index, list) {
        if (programme.type == 'programme') {
          _.each(corrections_list, function (change_pair, index, list) {
            const change_pattern = new RegExp(change_pair.change, 'g')
            programme.string = programme.string.replace(change_pattern, change_pair.to)
          })
          programme.string += '.'
          programme.string = programme.string.replace(/\s+/g, ' ')
          programme.string = programme.string.replace(/«/g, '"')
          programme.string = programme.string.replace(/»/g, '"')
          programme.string = programme.string.replace(/ё/g, 'е')
          programme.string = programme.string.replace(/Ё/g, 'Е')
          programme.string = programme.string.replace(/…./g, '…')
          programme.string = programme.string.replace(/\s*\.*$/g, '.')
          programme.string = programme.string.replace(/\s*\(\s*\)/g, '')
          programme.string = programme.string.replace(/\.+/g, '.')
          programme.string = programme.string.replace(/\s*"\./g, '".')
          programme.string = programme.string.replace(/([!?])\s*(")?\./g, '$1$2')
          programme.string = programme.string.replace(/\."/g, '"')
          console.log(programme.string)
        }
      })

      let full_programme = ''
      _.each(updated, function (programme, index, list) {
        if (programme.type == 'day') {
          full_programme += programme.string + '\n'
        } else {
          if (programme.age != undefined) {
            full_programme += programme.time + ' ' + programme.string + ' [' + programme.age + '+]\n'
          } else {
            full_programme += programme.time + ' ' + programme.string + '\n'
          }
        }
      })

      writeFileSync(join(txtPath, `${data.channelId}.txt`), full_programme)

      socket.emit('channel:processed', {
        content: updated
      })
    })

  })

}

function loadCorrectionsLists(channelId: string) {
  const full_list = []
  let list_content = ''


  console.log(channelId)

  const lists = Channels[channelId].lists

  _.each(lists, function (list, index) {
    if (existsSync('./lists/' + list + '.txt')) {
      list_content += readFileSync('./lists/' + list + '.txt', { encoding: 'utf-8' })
    }

  })
  list_content = list_content.replace(/\r/g, '')
  const lines = list_content.split('\n')

  _.each(lines, function (element, index) {
    const pair = element.split('~')
    if (pair.length === 2) {
      full_list.push({ change: pair[0], to: pair[1] })
    }
  })
  // console.log(full_list)
  return full_list
}
