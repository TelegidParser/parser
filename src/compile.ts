import { readFileSync } from 'fs'

import { breakIntoDays, Days, DaysShort } from './breakIntoDays'
import { convertToXml } from './convertToXml'
import { forEach } from 'lodash'
import { join } from 'path'
import { txtPath } from '../globals'
import {
  CentralGroup,
  ChildrenGroup,
  EducationGroup,
  EntertainmentGroup,
  MoviesGroup,
  MusicGroup,
  SportGroup
} from './config/CompileGroups'

const loadChannelFile = (channelId: string) =>
  readFileSync(join(txtPath, `${channelId}.txt`), 'utf8')


const compileChannels = (channelsGroup: string[]): { [key: string]: string[][] } => {
  const channelsByDay = {}

  forEach(channelsGroup, (channelId) => {
    const channelContent = loadChannelFile(channelId)
    const broken = breakIntoDays(channelContent)
    channelsByDay[channelId] = broken
  })

  return channelsByDay
}

const compileGroup = (channelsGroup, rootTag: string, outputFilename: string, subTag = '', joinChar = ' ', timeDivider = ' ', days = Days) => {
  const byDay = compileChannels(channelsGroup)

  convertToXml(channelsGroup, rootTag, byDay, outputFilename, subTag, joinChar, timeDivider, days)
  console.log(`${outputFilename} channel group saved`)
}

compileGroup(CentralGroup, 'Центральные', 'central', undefined, '\n', '\t', Days)

compileGroup(MoviesGroup, 'Кабельные', 'gc_01_movies', 'Кино', ' ', ' ', DaysShort)
compileGroup(ChildrenGroup, 'Кабельные', 'gc_02_children', 'Детские', ' ', ' ', DaysShort)
compileGroup(SportGroup, 'Кабельные', 'gc_03_sport', 'Спорт', ' ', ' ', DaysShort)
compileGroup(MusicGroup, 'Кабельные', 'gc_04_music', 'Музыка', ' ', ' ', DaysShort)
compileGroup(EducationGroup, 'Кабельные', 'gc_05_education', 'Познавательные', ' ', ' ', DaysShort)
compileGroup(EntertainmentGroup, 'Кабельные', 'gc_06_entertainment', 'Отдых', ' ', ' ', DaysShort)
